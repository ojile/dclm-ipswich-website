// src/services/liveStreamService.js
import axios from 'axios';
import { apiUrl } from '../apiConfig';

const getLiveStream = async () => {
  try {
    const response = await axios.get(`${apiUrl}/livestream`);
    return response.data;
  } catch (error) {
    console.error('Error fetching live stream data:', error);
    return {};
  }
};

export default { getLiveStream };
