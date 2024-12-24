import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import Explore from '../../components/Explore/Explore'
import Fooddisply from '../../components/Fooddisply/Fooddisply'
const Home = () => {
  const [category,setcategory]=useState("All")
  return (
    <div>
      <Header/>
      <Explore category={category} setcategory={setcategory}/>
      <Fooddisply category={category}/>
    </div>
  )
}

export default Home
