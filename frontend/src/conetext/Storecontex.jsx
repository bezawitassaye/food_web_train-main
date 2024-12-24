import { createContext, useEffect, useState } from "react";

import axios from "axios";

export const storecontext = createContext(null)


const Storecontextprovider = (props)=>{
    const backendurl="http://localhost:4000";
    const [cartitems,setcartitems]=useState({})
    const [token,settoken]= useState("")
    const [food_list,setfoodlist] =useState([])

    const addtocart = async (itemId)=>{
        if(!cartitems[itemId]){
            setcartitems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setcartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(backendurl+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removefromcart = async (itemId)=>{
        setcartitems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(backendurl+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }
   
    const gettotalcartamount = ()=>{
        let toalamount =0
        for(const item in cartitems){
            if(cartitems[item]>0){
                let itemInfo = food_list.find((product)=>product._id===item)
                toalamount += itemInfo.price * cartitems[item]
            }
        }
        return toalamount
    }
   const fetchfoodlist = async()=>{
     const response = await axios.get(backendurl+"/api/food/list")
     setfoodlist(response.data.data)
   }

   const loadCarddata = async(token)=>{
    const response = await axios.post(backendurl+"/api/cart/get",{},{headers:{token}})
   
    setcartitems(response.data.cartData)

   }
    useEffect(()=>{
       
        async function loaddata(){
            await fetchfoodlist()
            if(localStorage.getItem("token")){
                settoken(localStorage.getItem("token"))
                await loadCarddata(localStorage.getItem("token"))
            }
        } 
        loaddata()
    },[])
    const contextValue={
        food_list,
        cartitems,
        setcartitems,
        addtocart,
        removefromcart,
        gettotalcartamount,
        token,
        settoken
    }

    return(
        <storecontext.Provider value={contextValue}>
            {props.children}
        </storecontext.Provider>
    )
}

export default Storecontextprovider