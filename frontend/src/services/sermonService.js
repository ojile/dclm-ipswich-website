import axios from 'axios';
import { apiUrl } from '../apiConfig';

// Fetch all sermons without authentication
const getSermons = async () => {
  try {
    const response = await axios.get(`${apiUrl}/sermons`); // No Authorization header

    // Assuming 'created_at' is the timestamp field in the response data
    const sermons = response.data;

    // Sort sermons by 'created_at' in descending order (most recent first)
    sermons.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return sermons;
  } catch (error) {
    if (error.response) {
      console.error('Error fetching sermons:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      console.error('Error fetching sermons: No response received', error.request);
    } else {
      console.error('Error fetching sermons:', error.message);
    }
    return []; // Return an empty array on error
  }
};

// Fetch a single sermon by ID without authentication
const getSermonById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/sermons/${id}`); // No Authorization header
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error fetching sermon with ID ${id}:`, {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      console.error(`Error fetching sermon with ID ${id}: No response received`, error.request);
    } else {
      console.error(`Error fetching sermon with ID ${id}:`, error.message);
    }
    return null; // Return null on error
  }
};

export default { getSermons, getSermonById };
