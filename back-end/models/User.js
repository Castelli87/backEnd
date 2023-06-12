const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  location: {
    region: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
  },
  img: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
