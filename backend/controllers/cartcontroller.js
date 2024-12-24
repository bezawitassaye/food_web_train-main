import usermodel from "../models/usermodel.js"


const addTocart = async (req,res)=>{
    try {
        let userData = await usermodel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] =1
        } else{
            cartData[req.body.itemId]+=1
        }
        await usermodel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Add To Cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

const remove = async (req,res)=>{
    try {
        let userData = await usermodel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1
        }
        await usermodel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Removed from cart"})
    } catch (error) {
        console.log(error)
        remove.json({success:false,message:"Error"})
    }

}

const getcartitem=async (req,res)=>{
    try {
        let userdata = await usermodel.findById(req.body.userId)
        let cartData = await userdata.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}


export {addTocart,remove,getcartitem}
