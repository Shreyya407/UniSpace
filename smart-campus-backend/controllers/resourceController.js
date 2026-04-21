const Resource = require("../models/Resource");

/**
 * @route   GET /api/resources
 * @desc    Get all resources, with optional filtering by floor and/or type
 * @query   floor (Number) - filter by floor number
 * @query   type  (String) - filter by resource type ('classroom', 'lab', 'hall')
 * @access  Public
 */
const getResources = async (req, res) => {
  try {
    const { floor, type } = req.query;

    // --- Build filter object dynamically ---
    // Only adds a key to the filter if the query param was actually provided
    const filter = {};

    if (floor !== undefined) {
      const parsedFloor = parseInt(floor, 10);
      if (isNaN(parsedFloor)) {
        return res
          .status(400)
          .json({ message: "'floor' query parameter must be a number." });
      }
      filter.floor = parsedFloor;
    }

    if (type !== undefined) {
      const validTypes = ["classroom", "lab", "hall"];
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          message: `'type' must be one of: ${validTypes.join(", ")}.`,
        });
      }
      filter.type = type;
    }

    const resources = await Resource.find(filter).sort({ floor: 1, name: 1 });

    return res.status(200).json({
      count: resources.length,
      resources,
    });
  } catch (error) {
    console.error("Get resources error:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching resources." });
  }
};

module.exports = { getResources };