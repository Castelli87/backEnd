const mongoose = require("mongoose");
const Van = require("../models/Van");


const patchVan = async (req, res)=>{
    try {
        const { id } = req.params;
        const updatedData = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ msg: "bad request" });
        }
        if (Object.keys(updatedData).length === 0) {
            return res.status(400).send({ msg: 'missing required fields' })
        }

        const van = await Van.findById(id);
    
        if (!van) {
            return res.status(404).json({ msg: 'request not found' });
        }

        Object.assign(van, updatedData);

        const validationError = van.validateSync();
        if (validationError) {
            return res.status(400).json({ msg: 'invalid request' });
        }

        const updatedVan = await van.save();
        res.json({ updatedVan: updatedVan });


    } catch (error) {
        console.log(error);
    }
}


module.exports = {patchVan};