import React, {useState} from 'react';
import {FaLinkedin} from 'react-icons/fa';

function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Message:', message);

    setEmail('');
    setMessage('');
    alert('Thank you for reaching out!');
  };

  return (
    <div
      style={{
        padding: '40px',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center',
        fontFamily: 'tahoma, sans-serif',
        color: 'rgb(30, 101, 173)',
      }}
    >
      <h2 style={{fontSize: '28px', marginBottom: '10px'}}>Contact Us</h2>
      <p
        style={{
          fontSize: '16px',
          marginBottom: '30px',
          color: 'black',
          fontFamily: 'tahoma, sans-serif',
        }}
      >
        We would love to hear from you. Please send us a message with any
        questions or feedback.
      </p>
      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#f9f9f9',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          margin: '0 auto', // Center horizontally
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <label style={{width: '100%', marginBottom: '15px'}}>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Your email address'
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#0077b5')}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
        </label>

        <label
          style={{
            width: '100%',
            marginBottom: '15px',
            fontFamily: 'tahoma, sans-serif',
          }}
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder='Your message'
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              minHeight: '100px',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s',
              fontFamily: 'tahoma, sans-serif',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#0077b5')}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
        </label>

        <button
          type='submit'
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            backgroundColor: '#0077b5',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#005f90')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#0077b5')}
        >
          Send Message
        </button>
      </form>

      <div>
        <p style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '20px'}}>
          Connect with us:
        </p>

        {/* LinkedIn profiles for team members */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '20px',
          }}
        >
          {/* Marina */}
          <div style={{textAlign: 'center'}}>
            <a
              href='https://www.linkedin.com/in/marina-alvarado23'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                color: '#0077b5',
                textDecoration: 'none',
                fontSize: '24px',
              }}
            >
              <FaLinkedin style={{fontSize: '40px'}} />
            </a>
            <p
              style={{
                marginTop: '5px',
                fontSize: '14px',
              }}
            >
              Marina Alvarado
            </p>
          </div>

          {/* Joy */}
          <div style={{textAlign: 'center'}}>
            <a
              href='https://www.linkedin.com/in/joy-sykes-0ab439aa'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                color: '#0077b5',
                textDecoration: 'none',
                fontSize: '24px',
              }}
            >
              <FaLinkedin style={{fontSize: '40px'}} />
            </a>
            <p style={{marginTop: '5px', fontSize: '14px'}}>Joy Harrington</p>
          </div>

          {/* David */}
          <div style={{textAlign: 'center'}}>
            <a
              href='https://www.linkedin.com/in/david-opotowsky-6711546bgohosp'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                color: '#0077b5',
                textDecoration: 'none',
                fontSize: '24px',
              }}
            >
              <FaLinkedin style={{fontSize: '40px'}} />
            </a>
            <p style={{marginTop: '5px', fontSize: '14px'}}>David Opotowsky</p>
          </div>

          {/* Robert */}
          <div style={{textAlign: 'center'}}>
            <a
              href='https://www.linkedin.com/in/robbyderieux/'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                color: '#0077b5',
                textDecoration: 'none',
                fontSize: '24px',
              }}
            >
              <FaLinkedin style={{fontSize: '40px'}} />
            </a>
            <p style={{marginTop: '5px', fontSize: '14px'}}>Robert DeRieux</p>
          </div>

          {/* Alexis */}
          <div style={{textAlign: 'center'}}>
            <a
              href='https://www.linkedin.com/in/alexis-sushko-27a512329/'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                color: '#0077b5',
                textDecoration: 'none',
                fontSize: '24px',
              }}
            >
              <FaLinkedin style={{fontSize: '40px'}} />
            </a>
            <p style={{marginTop: '5px', fontSize: '14px'}}>Alexis Sushko</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
