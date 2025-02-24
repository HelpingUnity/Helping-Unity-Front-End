// In AuthContext.js
import React, { useState, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
      const { accessToken } = response.data;
      localStorage.setItem('token', accessToken);

      // Decode the token manually
      const decodedToken = parseJwt(accessToken);
      const id = decodedToken?.sub; // adjust if your id is stored under a different claim
      const role = decodedToken?.role || (decodedToken?.authorities && decodedToken.authorities[0]) || undefined;
      console.log("Extracted Role:", role);

      setUser({ id, username, token: accessToken, role });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('http://localhost:8080/api/auth/register', userData);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Include the helper function in the same file
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return null;
  }
}
