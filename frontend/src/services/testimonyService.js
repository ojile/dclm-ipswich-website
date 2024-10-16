// src/services/testimonyService.js
import axios from 'axios';
import { apiUrl } from '../apiConfig';

const getTestimonies = async () => {
  try {
    const response = await axios.get(`${apiUrl}/testimonies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching testimonies:', error);
    return [];
  }
};

export default { getTestimonies };
