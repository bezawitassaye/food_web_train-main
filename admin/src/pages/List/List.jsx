import React, { useEffect, useState } from 'react'
import "./List.css"
import { toast } from 'react-toastify'
import axios from 'axios'
const List = () => {
const backendurl="http://localhost:4000"
const [list,setList]=useState([])

const fetchlist = async ()=>{
  const response = await axios.get(backendurl+"/api/food/list")
  console.log(response)
  if(response.data.success){
    setList(response.data.data)
    response
  }
  else{
    toast.error("Error")
  }
}
useEffect(()=>{
  fetchlist()
},[])

const removefood = async(id)=>{
  console.log(id)
  const response = await axios.post(backendurl+"/api/food/remove",{id:id})
  await fetchlist()
  if(response.data.success){
    toast.success(response.data.message)
  }else{
    toast.error("Error")
  }
   
}
  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>

        </div>

        {
          list.map((item,index)=>{
            return(
              <div key={index} className="list-table-format">
                 <img src={`${backendurl}/images/`+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{item.price}</p>
                   <p className='cross' onClick={()=>removefood(item._id)}>X</p>

              </div>
            )
          })
        }
      </div>
  
      
    </div>
  )
}

export default List
