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
  Chip
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
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5}}>
        <CircularProgress size={60} thickness={4} color="secondary" />
      </Box>
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 5, p: 3, fontFamily: "'Poppins', sans-serif" , marginLeft:-35, marginRight: 36.5}}>
      <Paper
        elevation={7}
        sx={{
          p: 4,
          borderRadius: 4,
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(25, 118, 210, 0.21)',
          boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.4s ease-in-out',
          width:"200%"
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            backgroundImage: `linear-gradient(40deg, #19335A, #4675C0)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Poppins, sans-serif",
            mb: 3,
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          Let's Build a Better
          
          <Typography
          
          gutterBottom
          sx={{
            fontWeight: 'bold',
            mb: 3,
            fontSize: 34,
            backgroundImage: `linear-gradient(40deg, #19335A, #4675C0)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Poppins, sans-serif",
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
           Tommorow Together
        </Typography>

        </Typography>



        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'rgba(61, 61, 61, 0.84)',
            mb: 1,
            letterSpacing: '1px',
            textTransform: 'sentence-case',
            
          }}
        >
          FUNDING LIST
        </Typography>
        <Box
          sx={{
            maxHeight: 300,
            overflowY: 'auto',
            borderRadius: 3,
            p: 2,
            backgroundColor: 'transparent',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(31, 31, 31, 0.27)0',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgb(99, 99, 99)',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'rgba(25, 118, 210, 0.73)',
            },
            
          }}
        >


          {requests.length > 0 ? (
            <List sx={{ p: 0 }}>
              {requests.map((req) => (
                <ListItemButton
                  key={req.id}
                  component={Link}
                  to={`/donation-requests/${req.id}`}
                  TouchRippleProps={{ ripplecolor: '#ff5722' }}
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 3,
                    backgroundColor: 'white',
                    boxShadow: 5,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.73)',
                      transform: 'scale(1.03)',
                      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
                    },
                    '&:hover .MuiTypography-root': {
                      color: 'white !important', // Ensures text turns white on hover
                    },
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  <ListItemText
                    primary={req.title}
                    secondary={`Donation Type: ${req.donationType}`}
                    
                    sx={{
                      '& .MuiTypography-primary': {
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: 'primary.dark',
                        transition: 'color 0.3s ease-in-out',
                        fontFamily: "Poppins, sans-serif",
                      },
                      '& .MuiTypography-secondary': {
                        fontSize: '1rem',
                        color: 'text.secondary',
                        fontStyle: 'italic',
                        fontWeight: '500',
                        transition: 'color 0.3s ease-in-out',
                        fontFamily: "Poppins, sans-serif",
                      },
                      
                    }}
                    
                  />

                  <Chip label={`Trustee: ${req.trusteeComment?req.trusteeComment:"No Comments Yet"}`} color="success" variant="outlined" sx={{fontFamily: "Poppins, sans-serif",}} />
                </ListItemButton>
        
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
    </Container>
  );
};

export default DonationRequestList;
