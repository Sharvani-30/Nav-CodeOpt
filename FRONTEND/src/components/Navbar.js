import React, {useState} from 'react'
import Logo from "../assests/logo.png"
import {Link} from 'react-router-dom'
import '../styles/navbar.css'
import ReorderIcon from '@mui/icons-material/Reorder';
function Navbar() {
  const [openLinks, setOpenLinks]=useState(false);
  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
        <div className="leftSide"id={openLinks ?"open":"close"}>
            <img src={Logo}/>
            <div className="title">
          Code Optimizer
        </div>
        <div className="hiddenLinks">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>
        </div>
        
        <div className="rightSide">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
          <button onClick={toggleNavbar}>
            <ReorderIcon/>
          </button>
        </div>

    </div>
  )
}

export default Navbar;