// src/pages/Contact.js
import React from 'react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We would love to hear from you. Fill out the form below to get in touch.</p>
      <div className="form-container"> {/* Add a form-container for styling */}
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
