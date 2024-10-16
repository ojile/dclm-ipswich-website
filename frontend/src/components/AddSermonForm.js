// src/components/AddSermonForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../apiConfig';

const AddSermonForm = () => {
  const [title, setTitle] = useState('');
  const [preacher, setPreacher] = useState(''); // Updated state for preacher
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');  // State for content
  const [message, setMessage] = useState('');  // For success/error messages
  const [loading, setLoading] = useState(false);  // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading
    setMessage('');  // Clear previous messages

    const token = localStorage.getItem('token'); // Retrieve the token
    console.log('Token:', token); // Log the token to check its value

    try {
      const response = await axios.post(`${apiUrl}/sermons`, {
        title,
        preacher,         // Changed to use preacher state
        date_preached: date, // Changed to date_preached
        content  // Include content in the request body
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      });

      // Clear the form fields after successful submission
      setTitle('');
      setPreacher('');   // Clear preacher
      setDate('');
      setContent('');  // Clear content

      setMessage('Sermon added successfully!');  // Success message
      console.log('Sermon added:', response.data);

    } catch (error) {
      console.error('Error adding sermon:', error);
      setMessage('Error adding sermon. Please try again.');  // Error message
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div className="form-container">
      <h1>Add Sermon</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"  // Input for preacher
          placeholder="Preacher"
          value={preacher}
          onChange={(e) => setPreacher(e.target.value)}
          required
        />
        <input
          type="datetime-local" // Change to datetime-local for date
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <textarea  // Textarea for content
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding Sermon...' : 'Add Sermon'}
        </button>
      </form>

      {/* Display success/error message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddSermonForm;
