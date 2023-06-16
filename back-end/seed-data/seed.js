const mongoose = require("mongoose");
const User = require("../models/User");
const  users = require("../data/users");
const Van = require("../models/Van");
const campervans = require("../data/campervans");
const Reviews = require("../models/Reviews");
const reviews  = require("../data/reviews");
const Bookings = require("../models/Bookings");
const  bookings  = require("../data/bookings");


require("dotenv").config();

/* mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB",'<<<from seed');
  })
  .catch((err) => console.log(err));

const seedDb = async () => {
  await User.deleteMany({});
  await User.insertMany(users);
  await Van.deleteMany({});
  await Van.insertMany(campervans);
  await Reviews.deleteMany({});
  await Reviews.insertMany(reviews);
  await Bookings.deleteMany({});
  await Bookings.insertMany(bookings);
};

seedDb().then(() => {
  mongoose.connection.close();
});

exports.module=seedDb */


async function seedDatabase() {
  try {
    // Delete existing data
    await User.deleteMany({});
    await Van.deleteMany({});
    await Reviews.deleteMany({});
    await Bookings.deleteMany({});

    
    await User.create(users);
    await Van.insertMany(campervans);
    await Reviews.insertMany(reviews);
    await Bookings.insertMany(bookings);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

module.exports = seedDatabase;
