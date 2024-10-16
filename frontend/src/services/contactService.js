// src/services/contactService.js
import axios from 'axios';
import { apiUrl } from '../apiConfig';

const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${apiUrl}/contact`, formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

export default { submitContactForm };
