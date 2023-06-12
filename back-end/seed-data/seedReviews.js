const mongoose = require("mongoose");
const Reviews = require("../models/Reviews");
const { reviews } = require("../data/reviews");

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
  await Reviews.deleteMany({});
  await Reviews.insertMany(reviews);
};

seedDb().then(() => {
  mongoose.connection.close();
});
