const mongoose = require("mongoose");
const Booking = require("../models/Bookings");


const postBooking = async (req, res) => {
    
    const {userId, vanId, startDate, endDate, totalCost, paymentDetails}= req.body;
    const newBooking = new Booking({
        userId:userId,
        vanId:vanId,
        startDate:startDate,
        endDate:endDate,
        totalCost:totalCost,
        paymentDetails:paymentDetails
    })
    try {
        await newBooking.save();
        res.status(201).json({
            newBooking:newBooking
           
        });
      } catch (error) {
      
          return res.status(400).send({msg:'invalid request'})
        }
      

}


module.exports ={postBooking};