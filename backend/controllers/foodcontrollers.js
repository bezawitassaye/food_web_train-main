import foodmodel from "../models/foodmodel.js";

import fs from "fs"
const addFood = async (req, res) => {
    let image_filename = req.file.filename;  // file will be saved in /tmp

    const food = new foodmodel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename // Save filename in DB
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


const listfood = async (req,res)=>{
    try {
        const foods = await foodmodel.find({})
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }

}

const removefood = async (req, res) => {
    try {
        const food = await foodmodel.findById(req.body.id);
        // If using external storage, remove the file from the external service (e.g., S3)
        // For local file systems, use fs.unlink
        await foodmodel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


export {addFood,listfood,removefood}