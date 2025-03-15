
import React, { useState } from 'react';
import { Button, Box, Typography, TextField, Alert } from '@mui/material';
import axiosInstance from '../api/axiosInstance'; 
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; 

// DonationPayment component for handling donation payments
const DonationPayment = ({ donationRequestId, amountNeeded }) => {
  // State variables for amount, loading state, error, and success
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle the payment process when the donate button is clicked
  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount'); // Validate if the amount is greater than 0
      return;
    }

    setLoading(true); // Set loading state
    setError(''); // Clear any previous error

    try {
      const paymentData = {
        amount: Math.round(amount * 100), // Convert amount to cents for the payment
        currency: 'usd', // Define currency as USD
        paymentMethodId: 'tok_visa', // Use a placeholder for payment method (Stripe token)
        description: `Donation for request #${donationRequestId}`, // Description for the donation
        donationRequestId: donationRequestId // Include donation request ID
      };

      // Make API call to process the payment
      const response = await axiosInstance.post('/payments', paymentData);
      setSuccess(true); // Set success state if payment is successful
      setAmount(''); // Clear the amount input field
    } catch (error) {
      setError(error.response?.data || 'Payment failed. Please try again.'); // Handle payment errors
    } finally {
      setLoading(false); // Reset loading state after payment attempt
    }
  };

  return (
    <Box sx={{ padding: 4, borderRadius: 2, boxShadow: 2 }}> {/* Styling for the payment form container */}

      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Make a Donation
      </Typography>

      {amountNeeded && (
        <Typography sx={{ marginBottom: 2, color: 'text.secondary' }}>
          Amount Needed: ${amountNeeded} {/* Display the amount needed for donation */}
        </Typography>
      )}

      {/* Input fields for card details */}
      <TextField label="Owner Name" sx={{ width: '60%',  marginBottom: 2}}></TextField>
      <TextField label="CVV" sx={{ width: '35%',  marginBottom: 2, marginLeft: 2}}></TextField>
      <TextField label="Card Number" sx={{ width: '70%',  marginBottom: 2}}></TextField>
      <TextField type='date' sx={{ width: '25%',  marginBottom: 2, marginLeft: 2}}></TextField>

      {/* Input for donation amount */}
      <TextField
        type="number"
        label="Amount ($)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)} // Update the amount state when input changes
        sx={{ width: '97%', marginBottom: 2 }}
        inputProps={{ min: 0, step: "0.01" }} // Allow only numbers and decimals
      />

      {/* Display error alert if there's any validation or payment failure */}
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      {/* Display success alert after a successful donation */}
      {success && (
        <Alert severity="success" sx={{ marginBottom: 2 }}>
          Thank you for your donation!
        </Alert>
      )}

      {/* Button to submit the donation */}
      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment} // Call handlePayment on button click
        disabled={loading} // Disable button while loading
        sx={{ width: '100%', padding: '12px' }}
      >
        <AttachMoneyIcon sx={{ mr: 1 }} /> {/* Display a money icon next to the button text */}
        {loading ? 'Processing...' : 'Donate Now'} {/* Button text changes based on loading state */}
      </Button>
    </Box>
  );
};

export default DonationPayment; // Export the DonationPayment component
