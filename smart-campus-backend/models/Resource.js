const mongoose = require("mongoose");

const DEFAULT_SLOTS = [
  "08:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "01:00 PM - 03:00 PM",
  "03:00 PM - 05:00 PM",
];

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["classroom", "lab", "hall"],
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    availableSlots: {
      type: [String],
      default: DEFAULT_SLOTS,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);