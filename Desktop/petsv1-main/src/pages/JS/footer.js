import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../css/footer.css';
import logo from '../../images/petlogo.jpg'; // adjust path based on location

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Logo Section */}
        <div className="footer-section logo">
          <img src={logo} alt="BloodBridge Logo" className="footer-logo" />
        </div>

        {/* About Section */}
        <div className="footer-section about">
          <h3>About BloodBridge</h3>
          <p>
            BloodBridge, is a life-saving platform that connects blood donors with those in urgent need. 
            Our mission is to make blood donation simple, accessible, and impactful across Pakistan.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Sign Up</a></li>
            <li><a href="/donors">Find Donors</a></li>
            <li><a href="/request-blood">Request Blood</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: support@bloodbridge.com</p>
          <p>Phone: +92 300 1234567</p>
          <p>Location: Islamabad, Pakistan</p>
        </div>

        {/* Social Media Section */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 BloodBridge. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
