const mongoose = require("mongoose");
const User = require("../models/User");
const { users } = require("../data/users");

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
  await User.deleteMany({});
  await User.insertMany(users);
};

seedDb().then(() => {
  mongoose.connection.close();
});
