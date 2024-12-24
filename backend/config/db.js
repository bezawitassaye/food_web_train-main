import mongoose from "mongoose";

const connectdb = async()=>{
    try {
        mongoose.connect(process.env.mongo_url)
        console.log("db connected")
    } catch (error) {
        console.log(error)
        
    }
}

export default connectdb