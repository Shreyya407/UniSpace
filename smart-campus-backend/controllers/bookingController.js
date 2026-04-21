const Booking = require("../models/Booking");
const User    = require("../models/User");

// ── Helper: resolve custom userId string → Mongo User document ──────────────
const resolveUser = async (userId, res) => {
  const user = await User.findOne({ userId });
  if (!user) {
    res.status(404).json({ message: `No user found with userId '${userId}'.` });
    return null;
  }
  return user;
};

// ── Helper: "HH:MM" string → comparable integer (e.g. "09:30" → 570) ───────
// Allows simple numeric comparison for overlap detection without Date objects.
const timeToMinutes = (t = "") => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

// ───────────────────────────────────────────────────────────────────────────
// @route   POST /api/bookings
// @desc    Create a booking after validating for time conflicts
// @access  Public
// ───────────────────────────────────────────────────────────────────────────
const createBooking = async (req, res) => {
  const { userId, resourceId, date, startTime, endTime, reason } = req.body;

  // ── Input validation ─────────────────────────────────────────────────────
  if (!userId || !resourceId || !date || !startTime || !endTime) {
    return res.status(400).json({
      message: "userId, resourceId, date, startTime, and endTime are all required.",
    });
  }

  // Guard: endTime must be strictly after startTime
  if (timeToMinutes(endTime) <= timeToMinutes(startTime)) {
    return res.status(400).json({
      message: "endTime must be after startTime.",
    });
  }

  try {
    // ── Step 1: Resolve custom userId string → actual Mongo _id ─────────────
    const user = await resolveUser(userId, res);
    if (!user) return;

    // ── Step 2: Overlap / duplicate check ────────────────────────────────────
    // We block a new booking if, for the same resource on the same date,
    // there is any approved or pending booking whose time window overlaps
    // with the requested window.
    //
    // Two windows [A_start, A_end) and [B_start, B_end) overlap when:
    //   A_start < B_end  AND  A_end > B_start
    //
    // Stored as "HH:MM" strings, lexicographic comparison is equivalent
    // to numeric comparison, so we can use $lt / $gt directly on strings.
    const conflict = await Booking.findOne({
      resource: resourceId,
      date,
      status: { $in: ["approved", "pending"] },
      startTime: { $lt: endTime   }, // existing booking starts before new one ends
      endTime:   { $gt: startTime }, // existing booking ends   after  new one starts
    });

    if (conflict) {
      return res.status(400).json({
        message:
          "This room is already booked or requested for this time. " +
          `Conflict with an existing ${conflict.status} booking (${conflict.startTime}–${conflict.endTime}).`,
      });
    }

    // ── Step 3: Persist the booking ───────────────────────────────────────────
    const booking = new Booking({
      user:      user._id,
      resource:  resourceId,
      date,
      startTime,
      endTime,
      reason:    reason || "",
      // status defaults to 'pending' via schema
    });

    const saved = await booking.save();

    return res.status(201).json({
      message: "Booking created successfully.",
      booking: saved,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "resourceId is not a valid MongoDB ObjectId." });
    }
    console.error("createBooking error:", error);
    return res.status(500).json({ message: "Server error while creating booking." });
  }
};

// ───────────────────────────────────────────────────────────────────────────
// @route   GET /api/bookings/my-bookings/:userId
// @desc    Get all bookings for a specific user (populated)
// @access  Public
// ───────────────────────────────────────────────────────────────────────────
const getMyBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await resolveUser(userId, res);
    if (!user) return;

    const bookings = await Booking.find({ user: user._id })
      .populate("resource", "name type floor capacity")
      .sort({ createdAt: -1 });

    return res.status(200).json({ count: bookings.length, bookings });
  } catch (error) {
    console.error("getMyBookings error:", error);
    return res.status(500).json({ message: "Server error while fetching your bookings." });
  }
};

// ───────────────────────────────────────────────────────────────────────────
// @route   GET /api/bookings/all
// @desc    Get every booking in the system (Admin dashboard)
// @access  Public (Admin only in production)
// ───────────────────────────────────────────────────────────────────────────
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user",     "name role userId")
      .populate("resource", "name floor type capacity")
      .sort({ createdAt: -1 });

    // Surface pending requests first, preserve createdAt order within groups
    const STATUS_ORDER = { pending: 0, approved: 1, rejected: 2 };
    const sorted = [...bookings].sort(
      (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
    );

    return res.status(200).json({ count: sorted.length, bookings: sorted });
  } catch (error) {
    console.error("getAllBookings error:", error);
    return res.status(500).json({ message: "Server error while fetching all bookings." });
  }
};

// ───────────────────────────────────────────────────────────────────────────
// @route   PUT /api/bookings/:id/status
// @desc    Approve or reject a booking (Admin action)
// @access  Public (Admin only in production)
// ───────────────────────────────────────────────────────────────────────────
const updateBookingStatus = async (req, res) => {
  const { id }     = req.params;
  const { status } = req.body;

  const VALID_STATUSES = ["approved", "rejected"];
  if (!status || !VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      message: `'status' must be one of: ${VALID_STATUSES.join(", ")}.`,
    });
  }

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: `No booking found with id '${id}'.` });
    }

    booking.status = status;
    const updated  = await booking.save();

    return res.status(200).json({
      message: `Booking has been ${status}.`,
      booking: updated,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Booking id is not a valid MongoDB ObjectId." });
    }
    console.error("updateBookingStatus error:", error);
    return res.status(500).json({ message: "Server error while updating booking status." });
  }
};

module.exports = { createBooking, getMyBookings, getAllBookings, updateBookingStatus };