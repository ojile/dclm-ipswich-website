// src/components/ContactForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../apiConfig';  // Ensure the correct path to apiConfig

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(`${apiUrl}/contact`, formData);
      if (response.status === 200) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });  // Reset form on success
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setError('There was an issue submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
      {success && <p>Message sent successfully!</p>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default ContactForm;
