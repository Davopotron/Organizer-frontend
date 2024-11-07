import React, {useState} from 'react';
import '../css/footer.css';

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your email sending logic here (e.g., using an API or service)
    console.log('Email:', email);
    console.log('Message:', message);
    setEmail('');
    setMessage('');
  };

  return (
    <div className='footer-container'>
      <div className='footer-content'>
        <h4>Contact Us</h4>
        <p>Have any questions? Send us a message!</p>

        <form
          onSubmit={handleSubmit}
          className='email-form'
        >
          <input
            type='email'
            value={email}
            onChange={handleEmailChange}
            placeholder='Your email'
            required
            className='input-email'
          />
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder='Your message'
            required
            className='input-message'
          />
          <button
            type='submit'
            className='submit-button'
          >
            Send Email
          </button>
        </form>
        <div className='footer-links'>
          <a href='#'>About Us</a>
          <a href='#'>Contact</a>
          <a href='#'>Privacy Policy</a>
          <a href='#'>Terms of Service</a>
        </div>

        <div className='footer-links'>
          <span className='logo'>
            <a href='#'>TasteTracker</a>
          </span>
          <div>
            <p>Contact: totallyreal@food.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
