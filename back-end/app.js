const express = require("express");
const mongoose = require("mongoose");
const app = express();
const UserModel = require("./models/User");
const User = require("./models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


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

app.get("/users", async (req, res) => {
  try{
    const allUsers = await User.find({});

  return res.status(200).json({allUsers});
  } catch (err){
    console.log(err)
  }
})

app.get("/public-key", async (req, res) => {
  try {
    const publicKey = process.env.STRIPE_PUBLIC_KEY;

    return res.status(200).send({publicKey});
  }
  catch(err){
    console.log(err);
  }
})

app.post("/payment-intent", async ( req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "GBP",
      automatic_payment_methods: {enabled: true}
    })

    res.json({paymentIntent:paymentIntent.client_secret});
  } catch(err){
    console.log(err.message);
  }
})

// listen on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
