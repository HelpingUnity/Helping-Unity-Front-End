import { useState } from "react";

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import DonationRequestList from "./components/DonationRequestList";
import DonationRequestDetail from "./components/DonationRequestDetail";
import DonationRequestForm from "./components/DonationRequestForm";

import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { AuthProvider } from "./AuthContext/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import DonationPayment from "./components/DonationPayment";
import Profile from "./components/Profile.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <Router>
          {/* Navigation bar */}
          <AppBar
            position="fixed"
            sx={{
              top: 16, // adjust this to set distance from top
              left: "50%",
              transform: "translateX(-50%)",
              width: "90%", // or any fixed width if needed
              display: "flex",
              gap: 2,
              borderRadius: "50px", // ensure the value is a valid CSS string
              // Remove marginTop since position fixed doesn't account for it normally
            }}
          >
            <Toolbar>
              <Button component={Link} to="/donation-requests" color="#ffffff">
                <img
                  src="src/assets/image.png" 
                  alt="Logo"
                  style={{
                    height: 45,
                    width: "auto",
                    marginRight: 5,
                    borderRadius: 50,
                  }}
                />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    flexGrow: 0,
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 800,
                    fontSize: 25,
                    paddingLeft: 2,
                    color: "#ffffff",

                  }}
                >
                  Helping Unity
                </Typography>
              </Button>
              <Box
                sx={{ gap: 1, borderRadius: 25, flexGrow: 2, paddingLeft: 60 }}
              >
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  className="custom-button"
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/register"
                  className="custom-button"
                >
                  Register
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/donation-requests/new"
                  className="custom-button"
                >
                  Start New Donation
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/profile"
                  className="custom-button"
                  sx={{
                    alignItems: "center",
                    padding: 1,
                    textTransform: "none", // Optional: Disable uppercase
                  }}
                >
                  <img
                    src="src/assets/user1.png"
                    alt="User Icon"
                    style={{
                      width: "24px", // Adjust icon size
                      height: "24px",
                    }}
                  />
                  {/* Optional: Add text next to the icon */}
                </Button>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Add your navigation bar here if needed */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/donation-requests/:id/payments" element={<DonationPayment />}></Route>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route
              path="/donation-requests"
              element={<DonationRequestList />}
            />
            <Route
              path="/donation-requests/:id"
              element={<DonationRequestDetail />}
            />
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
                  <DonationRequestForm />
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
  );
}

export default App;
