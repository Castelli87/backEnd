const mongoose = require("mongoose");
const User = require("../models/User");


const patchUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ msg: "bad request" });
        }
        if (Object.keys(updatedData).length === 0) {
            return res.status(400).send({ msg: 'missing required fields' })
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'request not found' });
        }

        Object.assign(user, updatedData);

        const validationError = user.validateSync();
        if (validationError) {
            return res.status(400).json({ msg: 'invalid request' });
        }

        const updatedUser = await user.save();
        res.json({ updatedUser: updatedUser });


    } catch (error) {
        console.log(error);
    }
}



module.exports = { patchUser }




