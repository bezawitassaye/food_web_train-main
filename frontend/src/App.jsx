import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/Placeodre/Placeorder'
import Footer from './components/Footer/Footer'
import Loginpage from './components/Loginpage/Loginpage'
import Verify from './pages/Verify/Verify'
import Myorders from './pages/Myorders/Myorders'

const App = () => {
  const [showLogin,setchowLogin] = useState(false)
  return (
    <>
      {showLogin?<Loginpage setchowLogin={setchowLogin}/>:<></>}
      <div className='app'>
        <Navbar setchowLogin={setchowLogin} />
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Placeorder />} />
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<Myorders/>}/>
        </Routes>
      </div>
      <Footer />
    </>

  )
}

export default App
