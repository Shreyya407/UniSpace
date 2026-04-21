const User = require("../models/User");

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate a user by userId and plaintext password
 * @access  Public
 */
const login = async (req, res) => {
  const { userId, password } = req.body;

  // --- Input Validation ---
  if (!userId || !password) {
    return res
      .status(400)
      .json({ message: "userId and password are required." });
  }

  try {
    // --- Find user by their userId field (not Mongo _id) ---
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // --- Plaintext password check (demo only) ---
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // --- Return user data, explicitly excluding the password field ---
    const { password: _pw, ...userPayload } = user.toObject();

    return res.status(200).json({
      message: "Login successful.",
      user: userPayload,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login." });
  }
};

module.exports = { login };