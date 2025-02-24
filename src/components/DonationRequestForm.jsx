// src/components/DonationRequestForm.js
import React, { useState, useEffect, useContext } from 'react';
import { Container, TextField, Button, Typography, MenuItem, CircularProgress } from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
 // You might define donation type options here

const DonationRequestForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Donation Request' : 'Create Donation Request'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
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
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          {id ? 'Update' : 'Create'}
        </Button>
      </form>
    </Container>
  );
};

export default DonationRequestForm;
