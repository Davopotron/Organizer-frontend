import React, { useState } from "react";
import "../css/footer.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/PrivacyPolicy">Privacy Policy</Link>
          <Link to="/TermsOfService">Terms of Service</Link>
        </div>
        <div className="footer-links">
          <span className="logo">
            <a href="#">TasteTracker</a>
          </span>
          <div>
            <p>
              Contact:{" "}
              <a href="mailto:totallyreal@food.com">totallyreal@food.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
