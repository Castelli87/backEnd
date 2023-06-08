const express = require("express");
const mongoose = require("mongoose");
const app = express();
const UserModel = require("./models/User")


// implement dot env to read env variables
require("dotenv").config();

// connect mongodb with mongoose
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.use(express.json())
app.post("/users", async (req, res) => {
    console.log(req.body)
  const username = req.body.username;
  const name = req.body.name;
  const email = req.body.email;

  const user = new UserModel({
    username: username,
    name: name,
    email: email,
  });
  try {
    await user.save();
    res.status(201).json({
        message: 'We Win!!!!',
        user
    });
  } catch (error) {
    console.log(error);
  }
});
// listen on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
