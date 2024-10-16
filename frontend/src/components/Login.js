import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../assets/context/AuthContext'; // Assuming AuthContext is correctly set up
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { apiUrl } from '../apiConfig'; // Import apiUrl
import '../assets/styles/components-css/login.css'; // Import CSS styles for the login page

const Login = () => {
  const { login } = useContext(AuthContext); // Use login function from AuthContext
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');  // For success/error messages
  const [successMessage, setSuccessMessage] = useState(''); // For success message
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');  // Clear any previous error message
    setSuccessMessage(''); // Clear previous success message

    try {
      // Use axios to make a POST request to the correct endpoint
      const response = await axios.post(`${apiUrl}/auth/login`, credentials);

      // Extract the token from the response
      const { token } = response.data;

      // Save the token to local storage or context
      localStorage.setItem('token', token);  // Store token in local storage
      await login(credentials.username, credentials.password);  // If your context manages login state

      setError('');  // Clear error message on successful login
      setSuccessMessage('Login successful!'); // Set success message
      navigate('/home'); // Navigate to the home page

    } catch (err) {
      // Display error message
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);  // Stop loading state
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}  {/* Display error message if exists */}
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message if exists */}
      <form onSubmit={handleSubmit} className="login-form">
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
        <button
          type="submit"
          className="login-button"
          disabled={isLoading}  // Disable the button when loading
        >
          {isLoading ? 'Logging in...' : 'Login'}  {/* Update button text during loading */}
        </button>
      </form>
    </div>
  );
};

export default Login;
