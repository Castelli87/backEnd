const mongoose = require("mongoose");
const Bookings = require("../models/Bookings");
const { bookings } = require("../data/bookings");

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

const seedDb = async () => {
  await Bookings.deleteMany({});
  await Bookings.insertMany(bookings);
};

seedDb().then(() => {
  mongoose.connection.close();
});
