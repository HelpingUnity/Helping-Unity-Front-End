import { useState } from 'react'


import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import DonationRequestList from './components/DonationRequestList';
import DonationRequestDetail from './components/DonationRequestDetail';
import DonationRequestForm from './components/DonationRequestForm';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'
import { AuthProvider } from './AuthContext/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import DonationPayment from './components/Donation'
import Profile from './components/Profile.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<AuthProvider>
<Router>
  <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Helping Unity
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
              <Button color="inherit" component={Link} to="/donation-requests/new">Start New Donation</Button>
              <Button color='inherit' component={Link} to="/profile">Profile</Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Add your navigation bar here if needed */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/donation-requests" element={<DonationRequestList />} />
          <Route path="/donation-requests/:id" element={<DonationRequestDetail />} />
          <Route path="/profile" element={<Profile />} />

          {/* Only RECIPIENT should be allowed to create or edit donation requests */}
          <Route 
            path="/donation-requests/new" 
            element={
              // <ProtectedRoute allowedRoles={['RECIPIENT']}>
              <ProtectedRoute>
                <DonationRequestForm />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/donation-requests/edit/:id" 
            element={
              // <ProtectedRoute allowedRoles={['DONOR']}>
              <ProtectedRoute>
                <DonationRequestForm/>
                {/* <DonationRequestForm /> */}
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/donation-requests" />} />
        </Routes>
      </Router>
    </AuthProvider>






    {/* <Home /> */}
    </>
  )
}

export default App
