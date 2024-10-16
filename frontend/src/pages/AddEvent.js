import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { apiUrl } from '../apiConfig'; // Adjust this import based on your project structure
import '../assets/styles/components-css/addEvent.css'; 

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);  
  const [message, setMessage] = useState('');  
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  
    setMessage('');  

    // Validate input fields
    if (!title || !date || !venue) {
      setMessage("All fields are required.");
      setLoading(false);
      return;
    }

    // Retrieve token from localStorage
    const token = localStorage.getItem('token')?.trim(); // Ensure the token is trimmed
    if (!token || token.split('.').length !== 3) { // Validate if token has the correct structure
      setMessage("Invalid or missing token. Please log in again.");
      setLoading(false);
      localStorage.removeItem('token'); // Clear invalid token if present
      return;
    }
    
    console.log('Token being sent:', token); // Log the token for debugging

    try {
      const response = await axios.post(`${apiUrl}/events`, {
        title,
        date,
        description,
        location: venue, 
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include Authorization header with the token
        }
      });

      // Clear fields after successful submission
      setTitle('');
      setDate('');
      setVenue('');
      setDescription('');

      setMessage('Event added successfully!');  
      console.log('Event added:', response.data);

      // Redirect back to the events page
      navigate('/events'); 
    } catch (error) {
      console.error('Error adding event:', error);
      if (error.response && error.response.status === 403) {
        setMessage('Invalid token. Please log in again.'); // Handle invalid token specifically
        localStorage.removeItem('token'); // Clear invalid token
      } else {
        setMessage('Error adding event. Please try again.');  
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="add-event-container">
      <h1>Add New Event</h1>
      {message && <div className="message">{message}</div>} 
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Event Title:</label>
          <input 
            type="text" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input 
            type="datetime-local" 
            id="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="venue">Venue:</label>
          <input 
            type="text" 
            id="venue" 
            value={venue} 
            onChange={(e) => setVenue(e.target.value)} 
            required 
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding Event...' : 'Add Event'}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
