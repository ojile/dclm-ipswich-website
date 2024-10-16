import axios from 'axios';
import { apiUrl } from '../apiConfig';

const eventService = {
  getEvents: async () => {
    try {
      const token = localStorage.getItem('token')?.trim();
      console.log('Token:', token);
      console.log('Token Length:', token ? token.length : 'No token found');

      // Validate token format
      if (!token || token.split('.').length !== 3) {
        alert('Your session has expired. Please log in again.'); // Notify the user
        localStorage.removeItem('token'); // Clear invalid token
        return [];
      }

      const response = await axios.get(`${apiUrl}/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // Return the fetched events
    } catch (error) {
      console.error('Error fetching events:', error.response ? error.response.data : error);
      return []; // Return an empty array on error
    }
  },

  addEvent: async (eventData) => {
    try {
      const token = localStorage.getItem('token')?.trim();
      console.log('Token:', token);
      console.log('Token Length:', token ? token.length : 'No token found');

      // Validate token format
      if (!token || token.split('.').length !== 3) {
        alert('Your session has expired. Please log in again.'); // Notify the user
        localStorage.removeItem('token'); // Clear invalid token
        throw new Error('Invalid token format'); // Throw error to halt execution
      }

      const response = await axios.post(`${apiUrl}/events`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // Return the created event
    } catch (error) {
      console.error('Error adding event:', error.response ? error.response.data : error);
      throw error; // Rethrow the error to handle it in the component
    }
  },
};

export default eventService;
