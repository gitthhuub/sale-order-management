

import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const useAuthProvider = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = (username, password) => {
    if (username === 'user' && password === 'pass') {
      setIsAuthenticated(true);
      navigate('/');
      return true;
    } else {
      alert('Invalid credentials');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



