import React, { useState } from 'react';
import './styles/Navbar.css'; 

const Navbar = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div>
      <nav className="navbar">
        <i className="fas fa-bars menu-icon" onClick={toggleSidebar}></i>
        <h1>G210</h1>
      </nav>

     
      <div className={`sidebar ${sidebarActive ? 'active' : ''}`} id="sidebar">
        <div className="sidebar-content">
          <a href="#" className="closebtn" onClick={toggleSidebar}>
            &times;
          </a>
          <a href="#">Dashboard</a>
          <a href="#">Profile</a>
          <a href="#">Recent chats</a>
          <a href="#">Settings</a>
          <a href="#">Help</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
