const mongoose = require("mongoose");
const Reviews = require("../models/Reviews");
const Van = require("../models/Van");
const User=require("../models/User")

const getReviewByVanId = async (req, res) => {
  const { id } = req.params;
//check if is a valid objectID
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ msg: "bad request" });
  }
//check if is already used this Id
  const van = await Van.findById(id)
  if (!van) {
    return res.status(404).json({ error: "request not found" });
  }
//find reviews by the vanId sorting in a ascending way and JOIN the username to the userId
  const reviews = await Reviews.find({ vanId:id }).sort({
    createdAt: -1,
  }).populate({
    path: 'userId',
    select: 'username',
    model: User,
  })

  return res.status(200).json({ reviews:reviews});
};

const postReview = async (req, res)=>{
  const {userId, rating, comment}=req.body;
  const {id} = req.params;
  const newReview= new Reviews({
      userId:userId,
      vanId:id,
      rating:rating,
      comment:comment
  })
  try {
      await newReview.save();
      res.status(201).json({
          newReview:newReview
         
      });
    } catch (error) {
    
        return res.status(400).send({msg:'invalid request'})
      }
    

}

module.exports = { getReviewByVanId, postReview};
