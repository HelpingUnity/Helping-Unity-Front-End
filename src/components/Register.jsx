// src/components/Register.jsx
import React, { useState, useContext } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Alert, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { AuthContext } from '../AuthContext/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    role: 'DONOR'
  });
  
  const { register: registerUser, loading, error } = useContext(AuthContext);


  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await registerUser(formData);
    if (success) {
      alert('Registration successful! Please login.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Register</Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField margin="normal" required fullWidth name="username" label="Username" value={formData.username} onChange={handleChange} />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" value={formData.password} onChange={handleChange} />
          <TextField margin="normal" required fullWidth name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} />
          <TextField margin="normal" required fullWidth name="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
          <TextField margin="normal" required fullWidth name="phone" label="Phone" value={formData.phone} onChange={handleChange} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select name="role" value={formData.role} onChange={handleChange} label="Role">
              <MenuItem value="DONOR">Donor</MenuItem>
              <MenuItem value="RECIPIENT">Recipient</MenuItem>
              <MenuItem value="TRUSTEE">Trustee</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
