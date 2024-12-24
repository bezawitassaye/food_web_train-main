import React, { useContext, useEffect, useState } from 'react'
import "./Placeorder.css"
import { storecontext } from "../../conetext/Storecontex"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Placeorder = () => {
  const { cartitems, food_list, removefromcart,gettotalcartamount,token } = useContext(storecontext)
  const backendurl="http://localhost:4000";

  const [data,setdata] = useState({
    firistname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onchangehandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value
    setdata(data=>({...data,[name]:value}))
  }

  const placeorder = async (e) => {
    e.preventDefault();
    let orderitems = [];
    food_list.map((item) => {
        if (cartitems[item._id] > 0) {
            let itemInfo = item;
            itemInfo["quantity"] = cartitems[item._id];
            orderitems.push(itemInfo);
        }
    });

    let orderdata = {
        address: data,
        items: orderitems,
        amount: gettotalcartamount() + 2,
    };

    let response = await axios.post(backendurl + "/api/order/place", orderdata, {
        headers: { token },
    });

    console.log(response.data.session_url); // Fixed spelling here

    if (response.data.success) {
        const { session_url } = response.data; // Fixed spelling here
        window.location.replace(session_url);
    } else {
        alert("Error");
    }
};


 const navigate=useNavigate()

  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }else if(gettotalcartamount()===0)
    {
      navigate("/cart")
    }
    

  },[token])
  return (
    <form onSubmit={placeorder} action="" className="place-order">
      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
        <div className='multi-fields'>
          <input onChange={onchangehandler} value={data.firistname} name='firistname' type="text" placeholder='Firstname' />
          <input onChange={onchangehandler} value={data.lastname} name='lastname' type="text" placeholder='Lastname' />
        </div>
        <input onChange={onchangehandler} value={data.email} name='email' type="email" placeholder='Email address' />
        <input onChange={onchangehandler} value={data.street} name='street' type="text" placeholder=' Street' />
        <div className="multi-fields">
          <input name='city' value={data.city} onChange={onchangehandler} type="text" placeholder=' City' />
          <input name='state' value={data.state} onChange={onchangehandler}  type="text" placeholder=' State' />
        </div>
        <div className="multi-fields">
          <input name='zipcode' value={data.zipcode} onChange={onchangehandler} type="text" placeholder='Zip code' />
          <input name='country' value={data.country} onChange={onchangehandler} type="text" placeholder=' Country' />
        </div>
        <input name='phone' value={data.phone} onChange={onchangehandler} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{gettotalcartamount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Free</p>
              <p>{2}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
                <b>Total</b>
                <b>{gettotalcartamount()+2}</b>
            </div>
            <button type='submit' >Proceed To  PAYMENT</button>
          </div>
          
        </div>
      </div>
    </form>
  )
}

export default Placeorder
