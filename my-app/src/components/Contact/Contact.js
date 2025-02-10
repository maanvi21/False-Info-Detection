import React from 'react';
import './Contact.css';
import UserNavbar from '../User_Side/UserNavbar';

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Navigation Bar */}
      <UserNavbar/>

      <div className="contact-content">
        <h1 className="contact-title">Contact Us</h1>

        <div className="contact-grid">
          {/* Contact Form Card */}
          <div className="contact-card form-card">
            <h2>Send us a Message</h2>
            <form className="contact-form">
              <div className="form-group">
                <label>Name:</label>
                <input type="text" placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label>Subject:</label>
                <input type="text" placeholder="Enter subject" />
              </div>
              <div className="form-group">
                <label>Message:</label>
                <textarea placeholder="Type your message here..."></textarea>
              </div>
              <button type="submit" className="submit-button">SEND MESSAGE</button>
            </form>
          </div>

          {/* Contact Information Card */}
          <div className="contact-card info-card">
            <h2>Contact Information</h2>
            <div className="info-section">
              <h3>Address</h3>
              <p>FR. C RODRIGUES INSTITUTE OF TECHNOLOGY</p>
              <p>Vashi, Navi Mumbai</p>
              <p>Maharashtra, India</p>
            </div>
            
            <div className="info-section">
              <h3>Email</h3>
              <p>fakenewsdetection@gmail.com</p>
            </div>
            
            <div className="info-section">
              <h3>Phone</h3>
              <p>+91 123 456 7890</p>
            </div>

            <div className="info-section">
              <h3>Office Hours</h3>
              <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p>Saturday: 9:00 AM - 1:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;