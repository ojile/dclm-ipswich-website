// src/context/EventContext.js
import React, { createContext, useState, useEffect } from 'react';
import eventService from '../../services/eventService';

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch events, can be called during component mount or retry
  const fetchEvents = async () => {
    setLoading(true); // Set loading state to true whenever fetching starts
    setError(null);   // Reset the error state before trying to fetch data
    try {
      const data = await eventService.getEvents(); // Call the service to get events
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
      // Provide a more specific error message based on the error response
      const errorMessage = err.response?.data?.error || 'Failed to load events. Please try again later.';
      setError(errorMessage);
    } finally {
      setLoading(false); // Set loading to false when the fetching is complete
    }
  };

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Return the fetched events, loading state, error state, and refresh function for retry
  return (
    <EventContext.Provider value={{ events, loading, error, refresh: fetchEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
