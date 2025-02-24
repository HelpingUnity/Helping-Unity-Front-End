// src/components/FundingForm.jsx
import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, MenuItem, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const FundingForm = () => {
  const { id } = useParams(); // If id exists, we are in edit mode
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: '',
    donationType: 'MONETARY',
    amountNeeded: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // Edit mode: fetch existing funding campaign data
      setLoading(true);
      axiosInstance.get(`/donation-requests/${id}`)
        .then(response => {
          // If your API wraps the response in a "body" property, adjust accordingly:
          const data = response.data.body ? response.data.body : response.data;
          setFormData({
            description: data.description,
            donationType: data.donationType,
            amountNeeded: data.amountNeeded,
          });
        })
        .catch(err => {
          console.error('Error fetching funding:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (id) {
      // Update existing funding campaign
      axiosInstance.put(`/donation-requests/${id}`, formData)
        .then(() => {
          navigate(`/donation-requests/${id}`);
        })
        .catch(err => {
          console.error('Error updating funding:', err);
        })
        .finally(() => setLoading(false));
    } else {
      // Create new funding campaign
      axiosInstance.post('/donation-requests', formData)
        .then(() => {
          navigate('/donation-requests');
        })
        .catch(err => {
          console.error('Error creating funding:', err);
        })
        .finally(() => setLoading(false));
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Funding' : 'Start New Funding'}
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
          {id ? 'Update Funding' : 'Start Funding'}
        </Button>
      </form>
    </Container>
  );
};

export default FundingForm;
