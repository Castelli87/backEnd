const mongoose = require("mongoose");
const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({ allUsers });
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ msg: "bad request" });
  }

  const userById = await User.findById(id);

  if (!userById) {
    return res.status(404).json({ error: "request not found" });
  }
  res.status(200).json(userById);
};

module.exports = { getUsers, getUserById };
