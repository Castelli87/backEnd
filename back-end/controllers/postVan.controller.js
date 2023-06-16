const mongoose = require("mongoose");
const Van = require("../models/Van");

const postVan = async (req, res)=>{
    const { vanName, owner, description, make, model, year, location, pricePerNight, amenities, availabilityDates, images, sleeps }= req.body
    const newVan= new Van ({
        vanName:vanName,
        owner:owner,
        description:description,
        make:make,
        model:model,
        year:year,
        location:location,
        pricePerNight:pricePerNight,
        amenities:amenities,
        availabilityDates:availabilityDates,
        images:images,
        sleeps:sleeps 
    })
    try {
        await newVan.save();
        res.status(201).json({
            newVan: newVan
           
        });
      } catch (error) {
      
          return res.status(400).send({msg:'invalid request'})
        }
      
}

const postVanByOwner = async  (req, res)=>{
    const {owner}=req.params;
    const { vanName, description, make, model, year, location, pricePerNight, amenities, availabilityDates, images, sleeps }= req.body
    const newVan= new Van ({
        vanName:vanName,
        owner:owner,
        description:description,
        make:make,
        model:model,
        year:year,
        location:location,
        pricePerNight:pricePerNight,
        amenities:amenities,
        availabilityDates:availabilityDates,
        images:images,
        sleeps:sleeps 
    })
    try {
        await newVan.save();
        res.status(201).json({
            newVan: newVan
           
        });
      } catch (error) {
      
          return res.status(400).send({msg:'invalid request'})
        }
    

}

module.exports = {postVan, postVanByOwner}