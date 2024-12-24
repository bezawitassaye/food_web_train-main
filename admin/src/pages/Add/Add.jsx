import React, { useEffect, useState } from 'react'
import "./Add.css"
import axios from "axios"
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
const Add = () => {
  const backendurl="http://localhost:4000"
  const [image,setimage] = useState(false)
  const [data,setdata] =useState({
    name:"",
    description:"",
    price:"20",
    category:"Salad"
  })

  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value
    setdata(data=>({...data,[name]:value}))
  }

  const onsubmithandler = async (e)=>{
    e.preventDefault()
    const formDta = new FormData()
    formDta.append("name",data.name);
    formDta.append("description",data.description)
    formDta.append("price",Number(data.price));
    formDta.append("category",data.category);
    formDta.append("image",image)
    const response = await axios.post(backendurl + "/api/food/add",formDta)
    console.log(response)
    if(response.data.success){
      setdata({
        name:"",
        description:"",
        price:"22",
        category:"Salad"
      })
      setimage(false)
     
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }
  useEffect(()=>{
    console.log(data)
  },[data])
  return (
    <div className='add'>
      <form onSubmit={onsubmithandler} action="" className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
             <img  src={image? URL.createObjectURL(image):assets.upload_area} alt=''/>
          </label>
          <input onChange={(e)=>setimage(e.target.files[0])} type='file' id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' id=""></textarea>

        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler}  name="category" >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
          </div>

        </div>
        <button type='sumbit' className='add-btn'>ADD</button>
      </form>
      
    </div>
  )
}

export default Add
