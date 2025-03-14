// src/components/DonationRequestDetail.js
import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
  Paper,
  Chip,
  Fab
} from "@mui/material";
import NavigationIcon from '@mui/icons-material/Favorite';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from "../AuthContext/AuthContext";
import CommentSection from "../components/CommentSection";
import DonationPayment from "./DonationPayment";
import {
  BrowserRouter as Router,
  Routes,
  Link,
} from "react-router-dom";

const DonationRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePaymentComplete = (paymentData) => {
    console.log("Payment completed:", paymentData);
  };

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/donation-requests/${id}`)
      .then((response) => {
        console.log("Donation Request Detail Response:", response.data);
        console.log("Donation request data:", response.data.body);
        console.log(user);
        setRequest(response.data.body);
      })
      .catch((error) => {
        console.error("Error fetching donation request:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    axiosInstance
      .delete(`/donation-requests/${id}`)
      .then(() => {
        navigate("/donation-requests");
      })
      .catch((err) => {
        console.error("Delete error:", err);
      });
  };

  if (loading)
    return (
      <CircularProgress
        sx={{ display: "block", mx: "auto", mt: 4, color: "#1976d2" }}
      />
    );
  if (!request)
    return (
      <Typography
        sx={{
          textAlign: "center",
          mt: 4,
          color: "#d32f2f",
          fontWeight: "bold",
        }}
      >
        No donation request found.
      </Typography>
    );

  return (
    <Container sx={{ mt: 4, display: "flex", justifyContent: "center", p:5 }}>
      <Paper
        elevation={0}
        sx={{
          padding: 4,
          maxWidth: 800,
          width: "100%",
          borderRadius: 3,
          backgroundColor: "#ffffff",
          border: 1,
          borderColor: "#1976d2",
          
        }}
      >
        <Button component={Link} to="/donation-requests">
          <ArrowBackIcon sx={{ mr: 1, mt: -3, marginRight:100, color:"#1976d2" }} /> 
        </Button>


        <Typography
          variant="body1"
          sx={{
            mt: 2,
            textAlign: "center",
            fontSize: "1.82rem",
            color: "black",

            justifyContent: 'center',
            alignContent: 'center',
            fontFamily: "Poppins, sans-serif",
          }}
        >
                  
           {request.title}

        </Typography>

        <Chip label={request.donationType} color="info" sx={{fontFamily: "Poppins, sans-serif", fontSize: '0.8rem'}} />

        <Typography
          variant="body1"
          sx={{
            mt: 2,
            textAlign: "center",
            fontSize: "0.72rem",
            color: "black",

            justifyContent: 'center',
            alignContent: 'center',
            fontFamily: "Poppins, sans-serif",
          }}
        >
           {new Date(request.createdAt).toLocaleString()}

        </Typography>
        
        <Typography
          variant="h6"
          sx={{ fontWeight: 200, textAlign: "center", color: "#00000", fontFamily: "Poppins, sans-serif", padding: 5, fontSize: '1.2rem'}}
        >
          {request.description}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mt: 2,
            textAlign: "center",
            fontSize: "1.0rem",
            color: "#ffffff",
            fontWeight: 0,
            fontFamily: "Poppins, sans-serif",
            width:260,
            height:70,
            
            borderRadius: 4.5 ,
            borderColor: '#324A6e',
             background: 'linear-gradient(to right bottom, #ADD8e6, #324A6e)',
            alignContent: 'center',
          }}
        >
          Amount Needed: <strong>${request.amountNeeded}</strong>
        </Typography>


        <Typography
          variant="body1"
          sx={{
            mt: 2,
            textAlign: "center",
            fontSize: "1.0rem",
            color: "#ffffff",
            width:250,
            height:70,
            
            borderRadius: 4.5 ,
            borderColor: '#324A6e',
            background: 'linear-gradient(to right bottom, #DDDDDA, #94B0B7)' ,
            justifyContent: 'center',
            alignContent: 'center',
            fontFamily: "Poppins, sans-serif",
            marginTop: -9,
            marginLeft: 35
          }}
        >
          Amount Received: <strong>${request.amountReceived}</strong>

        </Typography>

        <Typography
          variant="body1"
          sx={{
            mt: 2,
            textAlign: "center",
            fontSize: "1.0rem",
            color: "#ffffff",
            width:200,
            height:70,
            borderRadius: 4.5 ,
            background: 'linear-gradient(to right bottom, #DE5B6D, #E9765B)' ,
            justifyContent: 'center',
            alignContent: 'center',
            fontFamily: "Poppins, sans-serif",
            marginTop: -9,
            marginLeft: 68.8
          }}
        >
          Status: <strong>{request.status}</strong>
        </Typography>


        {user && ((String(request.recipient?.id) === String(user.id)) || (user.role === "ADMIN")) && (
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2, padding: 2.5 }}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: 2.5,
                background: 'linear-gradient(to right bottom, #ADD8e6, #DCEAF7)' ,
                "&:hover": { background: 'linear-gradient(to right bottom,  #DCEAF7, #ADD8e6)' },
                padding: "10px 20px",
                boxShadow: 0,
                color: "#000000", 
                fontFamily: "Poppins, sans-serif",
              }}
              onClick={() => navigate(`/donation-requests/edit/${id}`)}
            >
              <EditIcon sx={{ mr: 1 }}/>
              Edit
            </Button>

            <Button
              variant="contained"
              sx={{
                borderRadius: 2.5,
                backgroundColor: "#d32f2f",
                "&:hover": { backgroundColor: "#c62828" },
                padding: "10px 20px",
                boxShadow: 0,
                fontFamily: "Poppins, sans-serif",
              }}
              onClick={handleDelete}
            >
              <DeleteIcon sx={{ mr: 1 }}/>
              Delete
            </Button>
          </Box>
        )}



        <Typography
          variant="h6"
          sx={{
            mt: 4,
            textAlign: 'center',
            fontSize: '1.3rem',
            color: '#f57c00',
            fontWeight: 'bold',
            textDecoration: 'underline', 
          }}
        >

        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2,mb:2, fontFamily: "Poppins, sans-serif", }}>

          <DonationPayment
            donationRequestId={request.id}
            amountNeeded={request.amountNeeded}
            onPaymentComplete={handlePaymentComplete}
          />
        </Box>

        <Box sx={{ mt: 4 }}>
          <CommentSection id={id} />
        </Box>




      </Paper>
    </Container>
  );
};

export default DonationRequestDetail;
