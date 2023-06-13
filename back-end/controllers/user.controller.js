const mongoose = require("mongoose");
const User = require('../models/User');



const getUsers = async (req, res)=>{
   try{
        const allUsers = await User.find({});
       res.status(200).json({allUsers});
      }catch(err){
        console.log(err);
      }
    }

    const getUserById = async (req, res)=>{
     try{
      const {id}= req.params;
      // if (!mongoose.Types.ObjectId.isValid(id)) {
      //   return res.status(400).json({msg:'bad request'})
      // }
      const userById = await User.findById(id)
      // if(!id){
      //   return res.status(404).json({msg:'request not found'})
      // }
      res.status(200).json(userById)
    }catch(err){
      console.log(err);
    }
  }
  
module.exports = {getUsers, getUserById}