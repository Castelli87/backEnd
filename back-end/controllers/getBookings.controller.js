const mongoose = require("mongoose");
const Bookings = require("../models/Bookings");

exports.getBookings = async (req, res) => {
    const bookings = await Bookings.find({});

    return res.status(200).send({bookings})
}