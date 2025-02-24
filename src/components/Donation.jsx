// DonationRequestForm.js
import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Box,
  CircularProgress
} from '@mui/material';
import { AuthContext } from '../AuthContext/AuthContext';

const DonationRequestForm = () => {
  const [formData, setFormData] = useState({
    donationType: 'MONETARY',
    description: '',
    amountNeeded: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = React.useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('http://localhost:8080/api/donation-requests', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Reset form and show success message
      setFormData({
        donationType: 'MONETARY',
        description: '',
        amountNeeded: 0
      });
      alert('Donation request created successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Only show form to recipients
  if (user?.role !== 'RECIPIENT') {
    return null;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Create Donation Request
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Type of Donation</InputLabel>
            <Select
              name="donationType"
              value={formData.donationType}
              onChange={handleChange}
              label="Type of Donation"
            >
              <MenuItem value="MONETARY">Money</MenuItem>
              <MenuItem value="ITEM">Items</MenuItem>
              <MenuItem value="BLOOD">Blood</MenuItem>
              <MenuItem value="ORGAN">Organ</MenuItem>
              <MenuItem value="SERVICE">Service</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />

          {formData.donationType === 'MONETARY' && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="amountNeeded"
              label="Amount Needed"
              type="number"
              value={formData.amountNeeded}
              onChange={handleChange}
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit Request'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default DonationRequestForm;