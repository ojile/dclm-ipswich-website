// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../assets/context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  // If user is not logged in, redirect to login
  return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
