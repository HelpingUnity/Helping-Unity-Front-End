import React, { useState, useEffect, useContext } from 'react';
import { Container, Paper, Typography, CircularProgress, Alert, Box, Avatar, Button } from '@mui/material';
import { AuthContext } from '../AuthContext/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';


const Profile = () => {
  const { token } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract token string from stored token
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

    //Fetch the user details
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user/me", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenString}`
          }
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("Error response:", text);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
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
    <Container maxWidth="sm" sx={{ mt: 3, p: 3, marginLeft:-50, marginRight:27.5 }}>
      <Paper elevation={0} sx={{ p: 4, mt: 4, textAlign: 'center',borderRadius: 5, width:"900%", background: 'linear-gradient(to right bottom,rgb(212, 244, 254),rgb(240, 246, 253))'}}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            <PersonIcon fontSize="large" />
          </Avatar>
        </Box>
        <Typography variant="h4" gutterBottom> {userDetails.username}</Typography>
        {userDetails && (
          <Box sx={{ textAlign: 'left', mt: 2, }}>
            <Typography variant="body1" sx={{ mb: 1, fontFamily: "Poppins, sans-serif" }}>
              <strong>Username:</strong> {userDetails.username}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, fontFamily: "Poppins, sans-serif" }}>
              <strong>Role:</strong> {userDetails.role}
            </Typography>
            <Typography variant="body1"  sx={{ mb: 1, fontFamily: "Poppins, sans-serif" }}>
              <strong>Email:</strong> {userDetails.email}
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: "Poppins, sans-serif" }}>
              <strong>Full Name:</strong> {userDetails.fullName}
            </Typography>
          </Box>
        )}

        { /* Log out*/}
        <a href='/login' sx={{ background: "#1976d2" }}> 
        <LogoutOutlinedIcon sx={{ mr: 3, 
          mt: 3, 
          marginRight:1, 
          color:"#ffffff", 
          background:'#1976d2', 
          padding: 1.5,
          borderRadius: 15,
           }} /> 
        </a>
      </Paper>
    </Container>
  );
};

export default Profile;