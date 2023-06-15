const mongoose = require("mongoose");
const Reviews = require("../models/Reviews");
const Van = require("../models/Van");

const getReviewByVanId = async (req, res) => {
  const { id } = req.params;

  try {
    const van = await Van.findById(id);
    if (van) {
      const reviews = await Reviews.find({ vanId: van }).sort({
        createdAt: -1,
      });
      // { sort: { createdAt: -1 } }

      return res.status(200).json({ reviews });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getReviewByVanId };
