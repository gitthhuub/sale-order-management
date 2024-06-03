
import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Pages/Login';
import SaleOrders from './components/Pages/SaleOrders';
import ThemeToggle from './components/ThemeToggle';
import { useAuth } from './components/hooks/useAuth';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
    <h1 working fine till active sale order need to correct from here></h1>
      <ThemeToggle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={isAuthenticated ? <SaleOrders /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
