// src/assets/context/SermonContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../apiConfig'; // Ensure this URL points to your backend API

const SermonContext = createContext();

const SermonProvider = ({ children }) => {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSermons = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const response = await axios.get(`${apiUrl}/sermons`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });

      if (response.status !== 200) {
        throw new Error(`Failed to fetch sermons: ${response.statusText}`);
      }

      setSermons(response.data);
    } catch (error) {
      console.error('Error fetching sermons:', error);
      setError('Error fetching sermons. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchSermons(); // Re-fetch sermons when called
  };

  useEffect(() => {
    fetchSermons();
  }, []);

  return (
    <SermonContext.Provider value={{ sermons, loading, error, refresh }}>
      {children}
    </SermonContext.Provider>
  );
};

export { SermonProvider, SermonContext };
