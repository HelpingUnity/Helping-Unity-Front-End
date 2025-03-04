// src/components/CommentSection.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import { AuthContext } from '../AuthContext/AuthContext';

const CommentSection = ({ id }) => {
  const { user } = useContext(AuthContext);
  const [donationRequest, setDonationRequest] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch donation request details (which include trustee comment fields)
  useEffect(() => {
    if (!id) {
      console.error("Donation request ID is missing.");
      return;
    }
    const fetchDonationRequest = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/donation-requests/${id}`);
        // Assuming donation request data is in response.data.body
        const data = response.data.body;
        setDonationRequest(data);
        setComment(data.trusteeComment || '');
      } catch (err) {
        console.error('Error fetching donation request:', err);
        setError('Failed to load donation request details');
      } finally {
        setLoading(false);
      }
    };

    fetchDonationRequest();
  }, [id]);

  // Save (add or update) the trustee comment
  const handleSave = async () => {
    if (!user || user.role !== 'TRUSTEE') return;
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.put(
        `/donation-requests/${id}/comments`,
        { comment },
        { params: { trusteeId: user.id } }
      );
      // Refresh donation request details after update
      const res = await axiosInstance.get(`/donation-requests/${id}`);
      const data = res.data.body;
      setDonationRequest(data);
      setComment(data.trusteeComment || '');
    } catch (err) {
      console.error('Error updating comment:', err);
      setError('Failed to save comment');
    } finally {
      setLoading(false);
    }
  };

  // Delete the trustee comment
  const handleDelete = async () => {
    if (!user || user.role !== 'TRUSTEE') return;
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/donation-requests/${id}/comments`, {
        params: { trusteeId: user.id }
      });
      // Refresh donation request details after deletion
      const res = await axiosInstance.get(`/donation-requests/${id}`);
      const data = res.data.body;
      setDonationRequest(data);
      setComment('');
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError('Failed to delete comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Trustee Comment
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Display the comment for everyone */}
      {donationRequest && donationRequest.trusteeComment ? (
        <Box sx={{ p: 2, borderRadius: 3, mb: 2, background: 'linear-gradient(to right bottom, #ADD8e6, #DCEAF7)' }}>
          <Typography variant="body1">{donationRequest.trusteeComment}</Typography>
          {donationRequest.commentDate && (
            <Typography variant="caption">
              Last updated: {new Date(donationRequest.commentDate).toLocaleString()}
            </Typography>
          )}
        </Box>
      ) : (
        <Typography variant="body2">No comment yet.</Typography>
      )}

      {/* Editing controls: Only show if the user is a TRUSTEE */}
      {user && user.role === 'TRUSTEE' && (
        <Box sx={{ mt: 2 }}>
          {donationRequest && donationRequest.trusteeComment ? (
            // If a comment exists, allow editing only if the logged trustee is the creator
            String(user.id) === String(donationRequest.trusteeId) ? (
              <>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter your comment here..."
                  sx={{ mt: 2 }}
                />
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
                    Update Comment
                  </Button>
                  <Button variant="outlined" color="error" sx={{ ml: 2 }} onClick={handleDelete} disabled={loading}>
                    Delete Comment
                  </Button>
                </Box>
              </>
            ) : (
              <Typography variant="body2" color="textSecondary">
                You cannot edit this comment.
              </Typography>
            )
          ) : (
            // If no comment exists, allow any trustee to add one.
            <>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your comment here..."
                sx={{ mt: 2 }}
              />
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
                  Add Comment
                </Button>
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CommentSection;
