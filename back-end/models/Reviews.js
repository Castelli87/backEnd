const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vanId: {
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
