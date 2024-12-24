import React, { useContext, useEffect, useState } from 'react'
import "./Loginpage.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import {storecontext} from "../../conetext/Storecontex"
const Loginpage = ({setchowLogin}) => {
    const {token,settoken} = useContext(storecontext)
    const backendurl="http://localhost:4000";

    const [curstate,setcurstate] = useState("Login")
    const [data,setdata]=useState({
        name:"",
        email:"",
        password:""
    })

    const onchangehandler = async (e)=>{
       
        const name = e.target.name
        const value = e.target.value
        setdata(data=>({...data,[name]:value}))
    }
    const Loginsignup = async(e)=>{
        e.preventDefault()
        let newUrl = backendurl;
        if(curstate === "Login"){
            newUrl += "/api/user/login"
        }else{
            newUrl += "/api/user/register"
        }
        const response = await axios.post(newUrl,data)

        if(response.data.success){
            settoken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setchowLogin(false)
            
        }else{
            alert(response.data.message)
        }
    }
    console.log(token)
  return (
    <div className='login-popup'>
        <form onSubmit={Loginsignup} action="" className='login-popup-center'>
            <div className="login-popup-title">
                <h2>{curstate}</h2>
                <img onClick={()=>setchowLogin(false)} src={assets.cross_icon} alt=''/>
            </div>

            <div className='login-popup-inputs'>
                {curstate==="Login"?<></>:
                <input name='name' onChange={onchangehandler} value={data.name} type="text" placeholder='Your name' required />}
                
                <input onChange={onchangehandler} name='email' value={data.email} type="email" placeholder='Your email' required />
                <input onChange={onchangehandler} name='password' value={data.password} type="password" placeholder='Your password' required />
            </div>
            <button type='submit'>{curstate==="Sign Up"?"Create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox"  required/>
                <p>By continuing i agree to the terms of use & privacy</p>
            </div>
            {
                curstate === "Login"?
                <p>Create new account <span onClick={()=>setcurstate("Sign Up")}>Click here</span></p>:
                <p>Already have an account <span onClick={()=>setcurstate("Login")}>Login here</span></p>
            }
        </form>
      
    </div>
  )
}

export default Loginpage
