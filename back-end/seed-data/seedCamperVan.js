const mongoose = require("mongoose");
const Van = require("../models/Van");
const { campervans } = require("../data/campervans");

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
  await Van.deleteMany({});
  await Van.insertMany(campervans);
};

seedDb().then(() => {
  mongoose.connection.close();
});
