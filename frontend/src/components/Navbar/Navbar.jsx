import React, { useContext, useState } from 'react'
import "./Navbar.css"
import {assets} from "../../assets/assets"
import {Link, useNavigate} from "react-router-dom"
import { storecontext } from '../../conetext/Storecontex'
const Navbar = ({setchowLogin}) => {
    const [menu,setmenu] = useState("")
    const {gettotalcartamount,token,settoken} = useContext(storecontext)

    const navigate = useNavigate()
    const logout = ()=>{
         localStorage.removeItem("token")
         settoken("")
         navigate("/")
    }
  return (
    
    <div className='navbar'>
        <Link to="/">
        <img src={assets.logo} alt='' className='logo'/>
        
        </Link>
        
        <ul className='navbar-menu'>
            <li onClick={()=>setmenu("home")} className={menu==="home"?"active":""}>home</li>
            <li onClick={()=>setmenu("menu")}  className={menu==="menu"?"active":""}>menu</li>
            <li onClick={()=>setmenu("mobile-app")}  className={menu==="mobile-app"?"active":""}>mobile-app</li>
            <li onClick={()=>setmenu("contact us")}  className={menu==="contact us"?"active":""}>contact us</li>
        </ul>
        <div className='navbar-right'>
            <img src={assets.search_icon} alt=''/>
            <div className='navbar-search-icon'>
                <Link to="/cart">
                <img src={assets.basket_icon} alt=''/>
                </Link>
                
                <div className={gettotalcartamount()===0?"":"dot"}></div>

            </div>
            {!token ?
            <button onClick={()=>setchowLogin(true)}>sign in </button>
            : <div className="navbar-profile">
                <img src={assets.profile_icon} alt="" />
                <ul className='navbar-profile-dropdown'>
                    <img onClick={()=>navigate("/myorders")} src={ assets.bag_icon} alt="" />
                    <p>Orders</p>
                    <hr />
                    <li>
                        <img src={assets.logout_icon} alt="" />
                        <p onClick={logout}>Logout</p>
                    </li>
                </ul>
            </div>

             }

        </div>
      
    </div>
  )
}

export default Navbar
