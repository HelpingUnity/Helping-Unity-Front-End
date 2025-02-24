// src/components/DonationRequestDetail.js
import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, CircularProgress } from '@mui/material';
import { AuthContext } from '../AuthContext/AuthContext';
import  CommentSection  from '../components/CommentSection'
import DonationPayment from './DonationPayment';

const DonationRequestDetail = () => {


  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePaymentComplete = (paymentData) => {
    // Handle successful payment (e.g., show success message, update UI)
    console.log('Payment completed:', paymentData);
  };

  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`/donation-requests/${id}`)
      .then(response => {
        console.log("Donation Request Detail Response:", response.data);
        console.log("Donation request data:", response.data.body);
        console.log(user);
        setRequest(response.data.body);
      })
      .catch(error => {
        console.error('Error fetching donation request:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    axiosInstance.delete(`/donation-requests/${id}`)
      .then(() => {
        navigate('/donation-requests');
      })
      .catch(err => {
        console.error('Delete error:', err);
      });
  };

  if (loading) return <CircularProgress />;
  if (!request) return <Typography>No donation request found.</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">{request.description}</Typography>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Amount Needed: {request.amountNeeded}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Status: {request.status}
      </Typography>

      
      {/* Show edit/delete buttons only if the current user is the owner */}
      {user && String(request.recipient?.id) === String(user.id) && (
        
        <>

            <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mr: 2 }}
            onClick={() => navigate(`/donation-requests/edit/${id}`)}
            >
            Edit
            </Button>
            <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={handleDelete}
            >
            Delete
            </Button>
        </>
        
        )}

    <Typography variant="h6" sx={{ mt: 4 }}>
        Donate Now
      </Typography>
      <DonationPayment 
      donationRequestId={request.id}
      amountNeeded={request.amountNeeded}
       onPaymentComplete={handlePaymentComplete}
    />

<CommentSection id={id} />
    </Container>
  );
};

export default DonationRequestDetail;
