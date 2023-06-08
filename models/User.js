const  mongoose = require("mongoose")

const UserSchema =  new mongoose.Schema({
    username :{
        type:String,
        required:true
    },
    name:{
        type:Object,
        required:true},
    email:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model("User", UserSchema);
