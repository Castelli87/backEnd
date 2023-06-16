const mongoose = require('mongoose');
const { Types } = mongoose;
const bookings = [
  {
    _id: new Types.ObjectId('648b2d2cbd34fabd752b0b05'),
    userId: "648733606b77da2cfea3e774",
    vanId: "64873c83768e970eec9aa22a",
    startDate: "2023-08-01",
    endDate: "2023-08-03",
    totalCost: 100,
    paymentDetails: "unpaid",
  },
  {
    _id: new Types.ObjectId('648b2d2cbd34fabd752b0b06'),
    userId: "648733606b77da2cfea3e773",
    vanId: "64873c83768e970eec9aa22b",
    startDate: "2023-12-01",
    endDate: "2023-12-03",
    totalCost: 120,
    paymentDetails: "unpaid",
  },
  {
    _id: new Types.ObjectId('648b2d2cbd34fabd752b0b07'),
    userId: "648733606b77da2cfea3e774",
    vanId: "64873c83768e970eec9aa22a",
    startDate: "2023-09-01",
    endDate: "2023-09-03",
    totalCost: 100,
    paymentDetails: "unpaid",
  },
];

module.exports = { bookings };
