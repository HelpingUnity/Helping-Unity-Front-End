// src/components/DonationRequestList.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

const DonationRequestList = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        setLoading(true);
        axiosInstance.get('/donation-requests')
          .then(response => {
            console.log('Donation Requests Response:', response.data);
            // Assuming the array is in response.data.body
            setRequests(Array.isArray(response.data.body) ? response.data.body : []);
          })
          .catch(error => {
            console.error('Error fetching donation requests:', error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);
      
  
    if (loading) return <CircularProgress />;
  
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Start Funding
        </Typography>
        <List>
  {requests.map((req) => (
    <ListItemButton key={req.id} component={Link} to={`/donation-requests/${req.id}`}>
        
        <ListItemText primary={req.description} secondary={`Amount Needed: ${req.donationType}` } />
    </ListItemButton>
  ))}
</List>
      </Container>
    );
  };
  
  export default DonationRequestList;