import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import {
  Container,
  Typography,
  List,
  ListItemText,
  CircularProgress,
  ListItemButton,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';

const DonationRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get('/donation-requests')
      .then((response) => {
        console.log('Donation Requests Response:', response.data);
        setRequests(Array.isArray(response.data.body) ? response.data.body : []);
      })
      .catch((error) => {
        console.error('Error fetching donation requests:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: 4 }} />;

  return (
    <Container sx={{ 
      mt: 4, 
      justifyContent: 'center',
      padding: 3,
      backgroundColor: 'background.default',
      borderRadius: 2, // Softer border radius
      boxShadow: 1, // Lighter shadow for a subtle effect
    }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ 
          textAlign: 'center', 
          color: 'primary.main', 
          fontWeight: '600', // Slightly lighter font weight
          fontSize: '1.8rem', // Slightly larger font size
          paddingBottom: 3,
          paddingTop: 2,
          letterSpacing: '0.5px', // Slight letter spacing for better readability
        }}
      >
        Start Funding
      </Typography>

      <Box
        sx={{
          maxHeight: '400px',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 1.5, // Softer border radius
          boxShadow: 1, // Lighter shadow
          padding: 2,
          border: '1px solid #eee', // Lighter border color
        }}
      >
        <List>
          {requests.map((req) => (
            <ListItemButton
              key={req.id}
              component={Link}
              to={`/donation-requests/${req.id}`}
              sx={{
                borderBottom: '1px solid #eee', // Lighter border color
                padding: 2,
                borderRadius: 1, // Softer border radius
                mb: 1,
                '&:hover': {
                  backgroundColor: 'action.hover', // Subtle hover effect
                  transform: 'translateX(4px)', // Slight horizontal movement on hover
                  transition: 'all 0.2s ease-in-out',
                },
              }}
            >
              <ListItemText
                primary={req.description}
                secondary={`Amount Needed: ${req.donationType}`}
                sx={{
                  color: 'text.primary',
                  '& .MuiTypography-primary': {
                    fontSize: '1.1rem', // Slightly smaller font size
                    fontWeight: '600', // Medium font weight
                  },
                  '& .MuiTypography-secondary': {
                    fontSize: '0.95rem', // Slightly smaller font size
                    fontWeight: '500',
                    color: 'text.secondary',
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default DonationRequestList;