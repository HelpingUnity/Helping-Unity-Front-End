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
} from "@mui/material";
import { AuthContext } from "../AuthContext/AuthContext";
import CommentSection from "../components/CommentSection";
import DonationPayment from "./DonationPayment";

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
    <Container sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          maxWidth: 800,
          width: "100%",
          borderRadius: 3,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, textAlign: "center", color: "#00000" }}
        >
          {request.description}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mt: 2,
            textAlign: "center",
            fontSize: "1.6rem",
            color: "#6a1b9a",
            fontWeight: 1,
          }}
        >
          Amount Needed: <strong>${request.amountNeeded}</strong>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            textAlign: "center",
            fontSize: "1.1rem",
            color: "#aa0426",
            fontWeight: "bold",
          }}
        >
          Status: <strong>{request.status}</strong>
        </Typography>

        {user && String(request.recipient?.id) === String(user.id) && (
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: 2,
                backgroundColor: "#ffb300",
                "&:hover": { backgroundColor: "#ffa000" },
                padding: "10px 20px",
                color: "#000000", // Fixed color code to #000000 for black
              }}
              onClick={() => navigate(`/donation-requests/edit/${id}`)}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              sx={{
                borderRadius: 2,
                backgroundColor: "#d32f2f",
                "&:hover": { backgroundColor: "#c62828" },
                padding: "10px 20px",
              }}
              onClick={handleDelete}
            >
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
    textDecoration: 'underline', // Corrected to 'underline'
  }}
>
  Donate Now
</Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2,mb:2 }}>
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
