import React from 'react';
import {FaLinkedin} from 'react-icons/fa';

function Contact() {
  return (
    <div style={{padding: '20px', textAlign: 'center'}}>
      <h2>Contact Us</h2>
      <p>
        We would love to hear from you. Please send us a message with any
        questions or feedback.
      </p>
      <div>
        <p>Connect with us:</p>

        {/* LinkedIn icon for Marina */}
        <div style={{marginBottom: '10px'}}>
          <a
            href='https://www.linkedin.com/in/marina-alvarado23'
            target='_blank'
            rel='noopener noreferrer'
            style={{fontSize: '30px', color: '#0077b5', textDecoration: 'none'}}
          >
            <FaLinkedin /> Marina Alvarado
          </a>
        </div>

        {/* LinkedIn icon for Joy */}
        <div style={{marginBottom: '10px'}}>
          <a
            href='https://www.linkedin.com/in/joy-sykes-0ab439aa'
            target='_blank'
            rel='noopener noreferrer'
            style={{fontSize: '30px', color: '#0077b5', textDecoration: 'none'}}
          >
            <FaLinkedin /> Joy Harrington
          </a>
        </div>

        {/* LinkedIn icon for David */}
        <div style={{marginBottom: '10px'}}>
          <a
            href='https://www.linkedin.com/in/david-opotowsky-6711546bgohosp'
            target='_blank'
            rel='noopener noreferrer'
            style={{fontSize: '30px', color: '#0077b5', textDecoration: 'none'}}
          >
            <FaLinkedin /> David Opotowsky
          </a>
        </div>

        {/* LinkedIn icon for Robert */}
        <div style={{marginBottom: '10px'}}>
          <a
            href='https://www.linkedin.com/in/robbyderieux/'
            target='_blank'
            rel='noopener noreferrer'
            style={{fontSize: '30px', color: '#0077b5', textDecoration: 'none'}}
          >
            <FaLinkedin /> Robert DeRieux
          </a>
        </div>

        {/* LinkedIn icon for Alexis */}
        <div style={{marginBottom: '10px'}}>
          <a
            href='https://www.linkedin.com/in/alexis-sushko-27a512329/' // Replace with the actual URL
            target='_blank'
            rel='noopener noreferrer'
            style={{fontSize: '30px', color: '#0077b5', textDecoration: 'none'}}
          >
            <FaLinkedin /> Alexis Sushko
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
