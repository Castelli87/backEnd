const mongoose = require("mongoose");

const VanSchema = new mongoose.Schema({
  vanName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  location: {
    region: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
  },
  amenities: {
    type: [String],
  },
  availabilityDates: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
  sleeps: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("van", VanSchema);
