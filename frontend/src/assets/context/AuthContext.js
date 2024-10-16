// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import authService from '../../services/authService'; // Your authentication service

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const userData = await authService.login(username, password);
    if (userData) {
      setUser(userData); // Set the user data in the context
    } else {
      throw new Error('Login failed'); // Handle login failure
    }
  };

  const logout = () => {
    setUser(null); // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
