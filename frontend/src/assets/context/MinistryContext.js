import React, { createContext, useState, useEffect } from 'react';
import ministryService from '../../services/ministryService'; // Use ministryService for API calls

// Create a Context for Ministry data
export const MinistryContext = createContext();

// Provider component to wrap the part of the app that needs access to the ministry data
export const MinistryProvider = ({ children }) => {
  const [ministries, setMinistries] = useState([]);

  // Fetch ministry data using the service
  const fetchMinistries = async () => {
    try {
      const data = await ministryService.getMinistries(); // Fetch ministries via service
      setMinistries(data);
    } catch (error) {
      console.error('Error fetching ministries:', error);
    }
  };

  // Fetch ministry data when the component mounts
  useEffect(() => {
    fetchMinistries(); // Fetch ministries when the component mounts
  }, []);

  return (
    <MinistryContext.Provider value={{ ministries, setMinistries }}>
      {children}
    </MinistryContext.Provider>
  );
};
