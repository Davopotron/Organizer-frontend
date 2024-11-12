import React, { useState } from "react";
import "../css/footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-content'>
        <div className='footer-links'>
          <Link to='/about'>About Us</Link>
          <Link to='/contact'>Contact</Link>
          <Link to='/PrivacyPolicy'>Privacy Policy</Link>
          <Link to='/TermsOfService'>Terms of Service</Link>
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    setMessage("");
  };

  return (
    <div className="footer-container">
      <div className="footer-content">
        <h4>Contact Us</h4>
        <p>Have any questions? Send us a message!</p>

        <form onSubmit={handleSubmit} className="email-form">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Your email"
            required
            className="input-email"
            aria-label="email-input"
          />
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="Your message"
            required
            className="input-message"
            aria-label="message"
          />
          <button type="submit" className="submit-button">
            Send Email
          </button>
        </form>
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/PrivacyPolicy">Privacy Policy</Link>
          <Link to="/TermsOfService">Terms of Service</Link>
>>>>>>> main
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
