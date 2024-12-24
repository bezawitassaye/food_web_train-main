import React, { useEffect } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Verify = () => {
  const [searchparams,setsearchparams] = useSearchParams()
  const success = searchparams.get("success")
  const orderId = searchparams.get("orderId")
  const backendurl="http://localhost:4000";
  const navigate = useNavigate()

  const verifypayment = async ()=>{
    const response = await axios.post(backendurl+"/api/order/verify",{success,orderId})
 
    if(response.data.success){
        navigate("/myorders")

    }else{
        navigate("/")
    }
  }

  useEffect(()=>{
     verifypayment()

  },[])
  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify
