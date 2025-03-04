import React, { useState, useEffect, useContext } from 'react';
import { Container, Paper, Typography, CircularProgress, Alert, Box, Avatar } from '@mui/material';
import { AuthContext } from '../AuthContext/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import shadows from '@mui/material/styles/shadows';


const Profile = () => {
  const { token } = useContext(AuthContext);
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
    <Container maxWidth="sm" sx={{ mt: 3, p: 3 }}>
      <Paper elevation={8} sx={{ p: 4, mt: 4, textAlign: 'center',borderRadius: 5,}}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            <PersonIcon fontSize="large" />
          </Avatar>
        </Box>
        <Typography variant="h4" gutterBottom> User Profile</Typography>
        {userDetails && (
          <Box sx={{ textAlign: 'left', mt: 2, }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Username:</strong> {userDetails.username}
            </Typography>
            <Typography variant="body1">
              <strong>Role:</strong> {userDetails.role}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;