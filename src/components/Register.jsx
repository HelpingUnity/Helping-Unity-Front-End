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
    <Container component="main" maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 24, marginBottom: 15 }}>
      <Paper elevation={0} sx={{ display: 'flex', width: '100%', maxWidth: 1200, padding: 0, alignItems: 'center' , borderRadius: 3,marginTop:-19,  }}>
        {/* Left Section with Logo & Text */}
        <Box sx={{ width: '40%', backgroundColor: '#f5f5f5', padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 3 ,height: 650}}>  
          <img src="src/assets/image.png" alt="Helping Unity" style={{ width: '100px', marginBottom: 16, borderRadius: 50 }} />
          <Typography variant="h6">Join Us!</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1, textAlign: 'center' }}>
            Create Your Helping Unity Account
          </Typography>
        </Box>

        {/* Right Section with registration form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.5, padding: 4 }}>
          <Typography variant="h5" fontWeight="bold">Create an Account</Typography>
          {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}
          <TextField required fullWidth name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} />
          <TextField required fullWidth name="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} />
          <TextField required fullWidth name="phone" label="Phone Number" value={formData.phone} onChange={handleChange} />
          <TextField required fullWidth name="username" label="Username" value={formData.username} onChange={handleChange} />
          <TextField required fullWidth name="password" label="Password" type="password" value={formData.password} onChange={handleChange} />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select name="role" value={formData.role} onChange={handleChange} label="Role">
              <MenuItem value="DONOR">Donor</MenuItem>
              <MenuItem value="RECIPIENT">Recipient</MenuItem>
              <MenuItem value="TRUSTEE">Trustee</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Sign up'}
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account? <a href="/login" style={{ fontWeight: 'bold', textDecoration: 'none' }}>Sign in</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
