const mongoose = require("mongoose");
const User = require("../models/User");


const patchUser = async (req, res) => {
   
    try {
        const { id } = req.params;
        
        // const validatedUser = User.validate(req.body);
        // if (validatedUser) {
            //     return res.status(400).send({ msg: 'invalid request' })
            // }
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ msg: "bad request" });
            }
            if (Object.keys(req.body).length === 0) {
                res.status(400).send({ msg: 'missing required fields' })
            } 
            const userById = await User.findById(id);
            console.log(userById);
            
            
            if (!userById) {
                return res.status(404).json({ error: "request not found" });
            }
            const updatedUser = await User.findOneAndUpdate( {_id:id} , {...req.body} )


        res.status(200).json({updatedUser:updatedUser});
    } catch (error) {
        console.log(error);
    }
}



module.exports = { patchUser }




  