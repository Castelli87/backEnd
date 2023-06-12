const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
});

module.exports = mongoose.model("reviews", ReviewsSchema);
