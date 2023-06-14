const mongoose = require("mongoose");
const User = require("../models/User");


const postUser = async (req, res) =>{
  const  {username,password,location,firstName,lastName,email,phoneNumber,img}=req.body;
  const newUser = new User({
    username:username,
    password:password,
    location:location,
    firstName:firstName,
    lastName:lastName,
    email:email,
    phoneNumber:phoneNumber,
    img:img
  })
  try {
        await newUser.save();
        res.status(201).json({
            newUser: newUser
           
        });
      } catch (error) {
      
          return res.status(400).send({msg:'invalid request'})
        }
      
}
    


module.exports = postUser
