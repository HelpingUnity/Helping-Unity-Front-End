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
  Paper,
  Grow,
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
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress size={60} thickness={4} color="secondary" />
      </Box>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 5, p: 3, fontFamily: "'Poppins', sans-serif" }}>
      <Grow in timeout={800}>
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 4,
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.12)',
            transition: 'all 0.4s ease-in-out',
            '&:hover': {
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
              transform: 'scale(1.02)',
            },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 3,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              
            }}
          >
            Start Funding
          </Typography>

          <Box
            sx={{
              maxHeight: 400,
              overflowY: 'auto',
              borderRadius: 3,
              boxShadow: 4,
              p: 2,
              backgroundColor: '#1976d2', 
              transition: 'all 0.4s ease-in-out',
              '&:hover': {
                backgroundColor: '#D1E9FB', 
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            {requests.length > 0 ? (
              <List sx={{ p: 0 }}>
                {requests.map((req, index) => (
                  <Grow in key={req.id} timeout={500 + index * 100}>
                    <ListItemButton
                      component={Link}
                      to={`/donation-requests/${req.id}`}
                      sx={{
                        mb: 1.5,
                        p: 2,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #f9f9f9, #ffffff)',
                        boxShadow: 2,
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateX(6px)', 
                          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.12)',
                          backgroundColor: '#F0F0F0',
                        },
                      }}
                    >
                      <ListItemText
                        primary={req.description}
                        secondary={`Amount Needed: ${req.donationType}`}
                        sx={{
                          '& .MuiTypography-primary': {
                            fontSize: '1.3rem',
                            fontWeight: '700',
                            color: 'primary.dark',
                            fontFamily: "'Roboto Slab', serif",
                          },
                          '& .MuiTypography-secondary': {
                            fontSize: '1rem',
                            color: 'text.secondary',
                            fontStyle: 'italic',
                            fontWeight: '500',
                          },
                        }}
                      />
                    </ListItemButton>
                  </Grow>
                ))}
              </List>
            ) : (
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: 'text.secondary',
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                No donation requests available.
              </Typography>
            )}
          </Box>
        </Paper>
      </Grow>
    </Container>
  );
};

export default DonationRequestList;
