import usermodel from "../models/usermodel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try {
        const user = await usermodel.findOne({email})
        if(!user){
            return res.json({success:false,message:"user does not exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"invalid credenttials"})
        }

        const token = createtoken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
   
}

const createtoken = (id)=>{
    return jwt.sign({id},process.env.jwt_secret)
}

const registerUser = async(req,res)=>{
    const {name,password,email} = req.body;

    try {
        const exist = await usermodel.findOne({email})
        if(exist){
            return res.json({success:false,message :"user already existes"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter a valid email"})
        }
        if(password.length <8){
            return res.json({success:false,message:"please enter a strong passsword"})

        }
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)

        const newUser = new usermodel({
            name:name,
            email:email,
            password:hashedpassword
        })
        const user = await newUser.save()
        const token = createtoken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }


}

export {loginUser,registerUser}