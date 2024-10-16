// src/services/donationService.js
import axios from 'axios';
import { apiUrl } from '../apiConfig';

const submitDonation = async (donationData) => {
  try {
    const response = await axios.post(`${apiUrl}/donations`, donationData);
    return response.data;
  } catch (error) {
    console.error('Error submitting donation:', error);
    throw error;
  }
};

export default { submitDonation };
