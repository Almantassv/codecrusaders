import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import Navbar from "./components/pages/Navbar";
import Registration from "./components/pages/Registration";
import './styles/Login.css';
import { AuthProvider, AuthContext } from './components/pages/AuthContext';
import PrivateRoute from './components/pages/privateRoutes';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <AuthProvider>
      <div className='App'>
        <Navbar token={token} onLogout={handleLogout} />
        <div className='content'>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/dashboard" element={
            <PrivateRoute roles={['User']}><Dashboard /></PrivateRoute>
            } />
            
          </Routes>
        </div>
      </div>
      </AuthProvider>
    </Router>
  );
};

export default App;

// <Route path='/registration' element={<Luko /> } />
