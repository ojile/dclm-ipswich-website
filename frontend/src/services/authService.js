import axios from 'axios';
import { apiUrl } from '../apiConfig'; // Import the API URL

// Login function
const login = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, { username, password }); // Updated the endpoint

    // Assuming the JWT token is returned in response.data.token
    const { token } = response.data;

    // Store the token in localStorage or sessionStorage for later use
    localStorage.setItem('token', token); // Save the token for future requests

    return response.data; // Return user data on successful login
  } catch (error) {
    console.error('Login error:', error);
    return null; // Return null if login fails
  }
};

// Function to get the Authorization header with token
const getAuthHeader = () => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  return token ? { Authorization: `Bearer ${token}` } : {}; // Return the Authorization header
};

// Example of a protected API call (createSermon function)
const createSermon = async (sermonData) => {
  try {
    const response = await axios.post(`${apiUrl}/sermons`, sermonData, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader() // Add Authorization header to the request
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating sermon:', error);
    return null; // Handle error appropriately
  }
};

// Export the login and createSermon functions as named exports
const authService = {
  login,
  createSermon,
};

export default authService; // Default export
