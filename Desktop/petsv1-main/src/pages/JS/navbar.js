// src/components/Navbar.js
import React, { useState } from 'react';
import '../css/navbar.css';
import logo from "../../images/petlogo.jpg"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <img src={logo} alt="Pet Logo" />
          PetPal
        </a>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <a href="/signup">Signup</a>
          <a href="/login">Login</a>
          <a href="/pet_managment">Pet Management</a>
          <a href="/messaging">MessagingPanel</a>
          <a href="/adoptionApplications">Adoption Applications</a>
          <a href="/eventScheduling">Event Scheduling</a>
          <a href="/settingsConfig">Setting </a>
          <a href="/chat">chat </a>


        </div>
      </div>
    </nav>
  );
};

export default Navbar;
