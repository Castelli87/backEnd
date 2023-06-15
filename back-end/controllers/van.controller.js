const mongoose = require("mongoose");
const Van = require("../models/Van");

const getVans = async (req, res) => {
  try {
    const allVans = await Van.find({});
    res.status(200).json({ allVans });
  } catch (err) {
    console.log(err);
  }
};

const getVanById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ msg: "bad request" });
  }

  const vanById = await Van.findById(id);

  if (!vanById) {
    return res.status(404).json({ error: "request not found" });
  }
  res.status(200).json(vanById);
};

module.exports = { getVans, getVanById };
