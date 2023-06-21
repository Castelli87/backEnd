const express = require("express");
const mongoose = require("mongoose");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { getUsers, getUserById,loginByUsername, postUser,patchUser } = require("./controllers/user.controller");
const { getVans, getVanById,postVanByOwner,postVan,patchVan, deleteVanById } = require("./controllers/van.controller");
const { getReviewByVanId,postReview} = require("./controllers/review.controller");
const { getApi } = require("./controllers/api.controller");
const { getBookings, getBookingById,postBooking} = require("./controllers/booking.controller");
app.use(express.json());

// implement dot env to read env variables
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

app.get("/users", getUsers);
app.get("/users/:id", getUserById);
app.post("/login", loginByUsername)

app.get("/vans", getVans);
app.get("/vans/:id", getVanById);
app.get("/vans/:id/reviews", getReviewByVanId);
app.get("/bookings/:booking_id", getBookingById);
app.get("/bookings", getBookings)

app.get("/api", getApi)

app.post("/users", postUser);
app.post("/vans", postVan);
app.post("/:owner/vans", postVanByOwner);
app.post("/bookings", postBooking);
app.post("/vans/:id/reviews", postReview);

app.patch("/users/:id", patchUser)
app.patch("/vans/:id",patchVan)

app.delete('/vans/:id', deleteVanById)



app.all("*", (req, res) => {
  res.status(404).send({ msg: "request not found" });
});

app.use((err, req, res, next) => {
  if (err.msg && err.status) res.status(err.status).send({ msg: err.msg })

  next(err);
})

module.exports = app;
// app.post("/users", async (req, res) => {
//     console.log(req.body)
//   const username = req.body.username;
//   const name = req.body.name;
//   const email = req.body.email;

//   const user = new UserModel({
//     username: username,
//     name: name,
//     email: email,
//   });
//   try {
//     await user.save();
//     res.status(201).json({
//         message: 'We Win!!!!',
//         user
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });


 app.listen(3000, () => {
  console.log("Server is listening on port 3000");
 });

// app.get("/public-key", async (req, res) => {
//   try {
//     const publicKey = process.env.STRIPE_PUBLIC_KEY;

//     return res.status(200).send({publicKey});
//   }
//   catch(err){
//     console.log(err);
//   }
// })

// app.post("/payment-intent", async ( req, res) => {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: req.body.amount,
//       currency: "GBP",
//       automatic_payment_methods: {enabled: true}
//     })

//     res.json({paymentIntent:paymentIntent.client_secret});
//   } catch(err){
//     console.log(err.message);
//   }
// })
