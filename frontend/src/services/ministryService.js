// src/services/ministryService.js
import axios from 'axios';
import { apiUrl } from '../apiConfig';

const getMinistries = async () => {
  try {
    const response = await axios.get(`${apiUrl}/ministries`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ministries:', error);
    return [];
  }
};

const getMinistryById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/ministries/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ministry with ID ${id}:`, error);
    return null;
  }
};

export default { getMinistries, getMinistryById };
