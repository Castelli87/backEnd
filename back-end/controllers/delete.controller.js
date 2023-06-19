const mongoose = require("mongoose");
const Van = require("../models/Van");


const deleteVanById = async (req, res)=>{
const id=req.params
console.log(id);
// Van.findByIdAndDelete(id).then((result)=>{
// console.log(result);
// })
}

module.exports={deleteVanById}