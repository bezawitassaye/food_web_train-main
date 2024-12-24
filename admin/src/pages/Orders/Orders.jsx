import React, { useState, useEffect } from 'react';
import "./Orders.css";
import axios from "axios";
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = () => {
  const backendurl = "http://localhost:4000";
  const [orders, setorders] = useState([]);

  const fetchallorders = async () => {
    try {
      const response = await axios.get(backendurl + "/api/order/listoredrs");
      console.log(response);
      if (response.data.success) {
        setorders(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders");
    }
  };

  useEffect(() => {
    fetchallorders();
  }, []);
  const statusupdated= async(e,orderId)=>{
    const response = await axios.post(backendurl+"/api/order/update",{orderId,status:e.target.value})
    if(response.data.success){
      await fetchallorders()
    }
  }
  console.log(orders);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {
          orders.map((order, index) => {
            return ( // Added return here
              <div key={index} className='order-item'>
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className='order-item-food'>
                    {
                      order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                          return item.name + " x " + item.quantity;
                        } else {
                          return item.name + " x " + item.quantity + ", ";
                        }
                      })
                    }
                  </p>
                  <p className='order-item-name'>{order.address.firstname + " " + order.address.lastname}</p>
                  <div className="order-item-address">
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>

                  </div>
                  <p className='order-item-phone'>{order.address.phone}</p>
                  
                </div>
                <p>Items:{order.items.length}</p>
                <p>${order.amount}</p>
                <select  onChange={(e)=>statusupdated(e,order._id)} value={order.status} >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default Orders;
