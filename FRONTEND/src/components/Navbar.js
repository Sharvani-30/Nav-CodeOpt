import React, { useState } from 'react';
import Logo from "../assests/logo.png";
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import ReorderIcon from '@mui/icons-material/Reorder';

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className="navbar">
      <div className="leftSide">
        <img src={Logo} alt="Logo" />
        <div className="title">Code Optimizer</div>
      </div>

      <div className={`rightSide ${openLinks ? "active" : ""}`}>
        <div className="navLinks">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <button className="toggleButton" onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>

      {openLinks && (
        <div className="menu">
          <Link to="/" onClick={toggleNavbar}>Home</Link>
          <Link to="/about" onClick={toggleNavbar}>About</Link>
          <Link to="/services" onClick={toggleNavbar}>Services</Link>
          <Link to="/contact" onClick={toggleNavbar}>Contact</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
