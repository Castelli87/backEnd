const mongoose = require("mongoose");
const Bookings = require("../models/Bookings");

const getBookings = async (req, res) => {
    const bookings = await Bookings.find({});

    return res.status(200).send({bookings})
}
const getBookingById = async (req, res, next) => {
    try{

        
    const id = req.params.booking_id;

    

    if(!mongoose.isValidObjectId(id)) res.status(400).send({msg: "bad request" });
    
    const booking = await Bookings.findById(id).exec()

    if(!booking ) res.status(404).send({msg: "request not found"})
    
    return res.status(200).send({booking});
    } catch(err){
        next(err)
    }
}


module.exports = {getBookings, getBookingById}