// src/components/DonationRequestForm.js
import React, { useState, useEffect, useContext } from 'react';
import { Container, TextField, Button, Typography, MenuItem, CircularProgress } from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import { useNavigate, useParams, Link } from 'react-router-dom';
 // You might define donation type options here

const DonationRequestForm = () => {
  const { id } = useParams(); // If id exists, then it is edit mode
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    donationType: 'MONETARY',
    amountNeeded: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch the existing request for editing
      setLoading(true);
      axiosInstance.get(`/donation-requests/${id}`)
        .then(response => {
          setFormData({
            // Added title
            title: response.data.title,
            description: response.data.description,
            donationType: response.data.donationType,
            amountNeeded: response.data.amountNeeded,
          });
        })
        .catch(err => console.error('Error fetching donation request', err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (id) {
      // Update existing request
      axiosInstance.put(`/donation-requests/${id}`, formData)
        .then(() => navigate(`/donation-requests/${id}`))
        .catch(err => console.error('Update error:', err))
        .finally(() => setLoading(false));
    } else {
      // Create new request
      axiosInstance.post('/donation-requests', formData)
        .then(() => navigate('/donation-requests'))
        .catch(err => console.error('Create error:', err))
        .finally(() => setLoading(false));
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container
    sx={{
      mt: 9,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'background.default',
      borderRadius: 2,
      boxShadow: 2,
      padding: 3,
      
    }}
  >
    <Typography
      variant="h4"
      gutterBottom
      sx={{
        color: 'primary.main',
        fontWeight: 'bold',
        fontSize: '1.8rem',
        textAlign: 'center',
        paddingBottom: 2,
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {id ? 'Edit Donation Request' : 'Create Donation Request'}
    </Typography>
    <form
      onSubmit={handleSubmit}
      sx={{ width: '100%', display: 'flex', flexDirection: 'column',  }}
    >
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        sx={{
          marginBottom: 2,
          '& .MuiInputBase-root': {
            borderRadius: 1,
            border: '1px solid #ddd',
          },
        }}
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        sx={{
          marginBottom: 2,
          '& .MuiInputBase-root': {
            borderRadius: 1,
            border: '1px solid #ddd',
          },
        }}
      />
      <TextField
        select
        label="Donation Type"
        name="donationType"
        value={formData.donationType}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        sx={{
          marginBottom: 2,
          '& .MuiInputBase-root': {
            borderRadius: 1,
            border: '1px solid #ddd',
          },
        }}
      >
        <MenuItem value="MONETARY">Monetary</MenuItem>
        <MenuItem value="ITEM">Item</MenuItem>
        <MenuItem value="BLOOD">Blood</MenuItem>
        <MenuItem value="ORGAN">Organ</MenuItem>
        <MenuItem value="SERVICE">Service</MenuItem>
      </TextField>
      <TextField
        label="Amount Needed"
        name="amountNeeded"
        type="number"
        value={formData.amountNeeded}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        sx={{
          marginBottom: 2,
          '& .MuiInputBase-root': {
            borderRadius: 1,
            border: '1px solid #ddd',
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          mt: 3,
          padding: '12px 24px',
          fontSize: '1rem',
          borderRadius: 2,
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        {id ? 'Update' : 'Create'}
      </Button>
      <Button
      component={Link} to={`/donation-requests/${id}`}
      sx={{
        mt: 3,
        padding: '12px 24px',
        fontSize: '1rem',
        borderRadius: 2,
      }}> Cancel

      </Button>
    </form>
  </Container>
  );
};

export default DonationRequestForm;
