import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import RaisingFunds from './components/RaisingFunds';
import SignIn from './components/SignIn';

const App = () => {
  const [user, setUser] = useState(null);

  // Check if the user is already logged in (using localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/raising-funds" element={user ? <RaisingFunds /> : <Navigate to="/sign-in" />} />
        <Route path="/sign-in" element={<SignIn setUser={setUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
