const mongoose = require("mongoose");

const BookingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  van: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Van",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  paymentDetails: {
    type: String,
  },
});

module.exports = mongoose.model("bookings", BookingsSchema);
