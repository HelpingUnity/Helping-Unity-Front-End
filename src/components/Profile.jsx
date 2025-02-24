import React, { useState, useEffect, useContext } from 'react';
import { Container, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import { AuthContext } from '../AuthContext/AuthContext';

const Profile = () => {
  const { token } = useContext(AuthContext); // token may be an object or string
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const extractTokenString = (storedToken) => {
    let tokenString = '';
    if (!storedToken) return tokenString;

    if (typeof storedToken === 'string') {
      try {
        const parsed = JSON.parse(storedToken);
        tokenString = parsed && parsed.token ? parsed.token : storedToken;
      } catch (e) {
        tokenString = storedToken;
      }
    } else if (typeof storedToken === 'object' && storedToken.token) {
      tokenString = storedToken.token;
    }
    return tokenString;
  };

  useEffect(() => {
    let tokenData = token || localStorage.getItem("token");
    const tokenString = extractTokenString(tokenData);
    console.log("Using token:", tokenString);

    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user/me", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenString}`
          }
        });

        console.log("Response status:", response.status);
        const contentType = response.headers.get("content-type");
        console.log('Content-Type:', contentType);

        if (!response.ok) {
            const text = await response.text();
            console.error("Error response:", text);
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

        const data = await response.json();
        console.log("User details:", data);
        setUserDetails(data);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (tokenString) {
      fetchUserDetails();
    } else {
      setError("No valid token found. Please log in.");
      setLoading(false);
    }
  }, [token]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>User Profile</Typography>
        {userDetails && (
          <>
            <Typography variant="body1">ID: {userDetails.id}</Typography>
            <Typography variant="body1">Username: {userDetails.username}</Typography>
            <Typography variant="body1">Role: {userDetails.role}</Typography>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
