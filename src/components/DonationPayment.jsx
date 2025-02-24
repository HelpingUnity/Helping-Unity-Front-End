
import React from 'react';
import { useEffect, useState, useContext } from 'react';

import { Button, Box, Typography, TextField, Alert } from '@mui/material';
import axiosInstance from '../api/axiosInstance';

const DonationPayment = ({ donationRequestId, amountNeeded }) => {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
  
    const handlePayment = async () => {
      if (!amount || amount <= 0) {
        setError('Please enter a valid amount');
        return;
      }
  
      setLoading(true);
      setError('');
  
      try {
        const paymentData = {
          amount: Math.round(amount * 100), // Convert to cents
          currency: 'usd',
          paymentMethodId: 'tok_visa', // Replace with actual Stripe token
          description: `Donation for request #${donationRequestId}`,
          donationRequestId: donationRequestId
        };
  
        const response = await axiosInstance.post('/payments', paymentData);
        setSuccess(true);
        setAmount('');
      } catch (error) {
        setError(error.response?.data || 'Payment failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Box className="p-4 border rounded-lg shadow-sm">
        <Typography variant="h6" className="mb-4">
          Make a Donation
        </Typography>
        
        {amountNeeded && (
          <Typography className="mb-2 text-gray-600">
            Amount Needed: ${amountNeeded}
          </Typography>
        )}
  
        <TextField
          type="number"
          label="Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-4"
          inputProps={{ min: 0, step: "0.01" }}
        />
  
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
  
        {success && (
          <Alert severity="success" className="mb-4">
            Thank you for your donation!
          </Alert>
        )}
  
        <Button
          variant="contained"
          color="primary"
          onClick={handlePayment}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Processing...' : 'Donate Now'}
        </Button>
      </Box>
    );
  };
  

export default DonationPayment;
