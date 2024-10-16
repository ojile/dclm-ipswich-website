import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../apiConfig'; // Import apiUrl
import '../assets/styles/components-css/signup.css'; // Import CSS styles for the sign-up page

const Signup = () => {
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');  // For success/error messages
  const [success, setSuccess] = useState('');  // For success messages
  const [isLoading, setIsLoading] = useState(false);  // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');  // Clear any previous messages

    // Basic validation
    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      // Use axios to make a POST request to the signup endpoint
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      });

      setSuccess('Signup successful! You can now login.');
      setCredentials({ username: '', email: '', password: '', confirmPassword: '' });  // Reset form

    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);  // Stop loading state
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      {error && <p className="error-message">{error}</p>}  {/* Display error message if exists */}
      {success && <p className="success-message">{success}</p>}  {/* Display success message if exists */}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            disabled={isLoading}  // Disable input during loading
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            disabled={isLoading}  // Disable input during loading
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            disabled={isLoading}  // Disable input during loading
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleChange}
            required
            disabled={isLoading}  // Disable input during loading
          />
        </div>
        <button
          type="submit"
          className="signup-button"
          disabled={isLoading}  // Disable the button when loading
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}  {/* Update button text during loading */}
        </button>
      </form>
    </div>
  );
};

export default Signup;
