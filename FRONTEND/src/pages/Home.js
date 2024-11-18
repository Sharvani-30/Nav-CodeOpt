import React from 'react'
import { useState,useEffect } from "react";

import BannerImage from '../assests/back.png'
import '../styles/Home.css'
function Home() {
  const [data,setData]=useState([{}])

  useEffect(()=>{
    fetch("/members").then(
      res=>res.json()
    ).then(
      data =>{
        setData(data)
        console.log(data)
      }
    )
  },[]);
  return (
    
    <div className="home"style={{backgroundImage:`url(${BannerImage})`}}>
      <div className="headerContainer">
        <h1>Code Optimizer</h1>
        <p>Solution to all coding queries</p>
      </div>
      <form>
      <input name="query" placeholder="Enter your query" type="text" />
      <button type="submit"> Enter</button>
      </form>
    </div>
  )
}

export default Home