const mongoose = require("mongoose");
const Reviews = require("../models/Reviews");
const Van = require("../models/Van");
const User=require("../models/User")

/* async function getReviewWithUsername(reviewId) {
  try {
    const review = await Review.findById(reviewId).populate('user');
    if (review && review.user) {
      const { username } = review.user;
      console.log('Username:', username);
    } else {
      console.log('Review not found or user not associated');
    }
  } catch (error) {
    console.log('Error:', error.message);
  }
} */


const getReviewByVanId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ msg: "bad request" });
  }
  const van = await Van.findById(id);

  if (!van) {
    return res.status(404).json({ error: "request not found" });
  }
  /* getReviewWithUsername() */

  const reviews = await Reviews.find({ vanId: van }).sort({
    createdAt: -1,
  });
  const username = await User.find({userId:reviews.userId})



  return res.status(200).json({ reviews ,username});
};

module.exports = { getReviewByVanId };
