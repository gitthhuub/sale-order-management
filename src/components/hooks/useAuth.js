// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const useAuth = () => {
//   const [isAuth, setIsAuth] = useState(false);
//   const navigate = useNavigate();

//   const login = (username, password) => {
//     if (username === 'user' && password === 'pass') {
//       setIsAuth(true);
//       navigate('/');
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   const logout = () => {
//     setIsAuth(false);
//     navigate('/login');
//   };

//   return {
//     isAuthenticated,
//     login,
//     logout,
//   };
// };

// export default useAuth;



import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username, password) => {
    if (username === 'user' && password === 'pass') {
      setIsAuthenticated(true);
      return true;
    } else {
      alert('Invalid credentials');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


