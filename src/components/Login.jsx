import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/donation-requests');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' ,marginTop:-15}}>
      <Paper elevation={7} sx={{ display: 'flex', width: '100%', borderRadius: 3, overflow: 'hidden' }}>
        
        {/* Left Section - Welcome Message */}
        <Box sx={{ width: '40%',backgroundColor: '#f5f5f5', padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' ,}}>
          <img src="src/assets/image.png" alt="Helping Unity" style={{ width: '100px', marginBottom: 16 ,borderRadius:50}} />
          <Typography variant="h6">Welcome Back!</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1, textAlign: 'center' }}>
            Sign in to Helping Unity
          </Typography>
        </Box>

        {/* Right Section - Login Form */}
        <Box sx={{ flex: 1, padding: 4, position: 'relative' }}>
          
          {/* Sign Up Link */}
          <Typography sx={{ position: 'absolute', top: 20, right: 30, fontSize: 14 }}>
            Don't have an account? <a href="/register" style={{ fontWeight: 'bold', textDecoration: 'none' }}>Sign Up</a>
          </Typography>

          <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold', mt:10}}>Your Account Details</Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="Email Address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ bgcolor: '#f5f5f5', borderRadius: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ bgcolor: '#f5f5f5', borderRadius: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, borderRadius: 3, mb: 4 }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </Box>
        </Box>

      </Paper>
    </Container>
  );
};

export default Login;
