import React, { useState } from 'react';
import { Button, Box, Typography, TextField, Alert } from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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
        paymentMethodId: 'tok_visa', // Replace with actual Stripe token when integrating
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
    <Box sx={{ padding: 4, borderRadius: 2, boxShadow: 2 }}>

      <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Make a Donation
      </Typography>

      {amountNeeded && (
        <Typography sx={{ marginBottom: 2, color: 'text.secondary' }}>
          Amount Needed: ${amountNeeded}
        </Typography>
      )}


      <TextField label="Owner Name" sx={{ width: '60%',  marginBottom: 2}}></TextField>
      <TextField label="CVV" sx={{ width: '35%',  marginBottom: 2, marginLeft: 2}}></TextField>
      <TextField label="Card Number" sx={{ width: '70%',  marginBottom: 2}}></TextField>
      <TextField type='date' sx={{ width: '25%',  marginBottom: 2, marginLeft: 2}}></TextField>


      <TextField
        type="number"
        label="Amount ($)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{ width: '97%', marginBottom: 2 }}
        inputProps={{ min: 0, step: "0.01" }}
      />

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ marginBottom: 2 }}>
          Thank you for your donation!
        </Alert>
      )}


      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment}
        disabled={loading}
        sx={{ width: '100%', padding: '12px' }}
      >
                <AttachMoneyIcon sx={{ mr: 1 }} />
        {loading ? 'Processing...' : 'Donate Now'}
      </Button>
    </Box>
  );
};

export default DonationPayment;
