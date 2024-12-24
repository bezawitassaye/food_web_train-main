import ordermodel from "../models/ordermodel.js";
import usermodel from "../models/usermodel.js"
import Stripe from "stripe"
const stripe = new Stripe(process.env.stripe_secret_key)

const placeorder = async(req,res)=>{
    const frontendurl ="http://localhost:5173"
    try {
        const neworder = new ordermodel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await neworder.save()
        await usermodel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price *100*80
            },
            quantity:item.quantity

        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1

           
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontendurl}/verify?success=true&orderId=${neworder._id}`,
            cancel_url:`${frontendurl}/verify?success=false&orderId=${neworder._id}`,
        })

        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }

}

const verify = async(req,res)=>{
    const {orderId,success}= req.body

    try {
        if(success=="true"){
            await ordermodel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"Paid"})
        }else{
            await ordermodel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }

}

const userorders = async(req,res)=>{
    try {
        const orders = await ordermodel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }
}

const listorders = async(req,res)=>{
    try {
        const orders = await ordermodel.find({})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }
}
const updatestatus = async(req,res)=>{
    try {
        await ordermodel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}
export {placeorder,verify,userorders,listorders,updatestatus}