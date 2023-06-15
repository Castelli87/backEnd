const mongoose = require("mongoose");
const Reviews =require("../models/Reviews");

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

module.exports = {postReview};