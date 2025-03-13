import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  CircularProgress,
  Alert,
  Box,
  Avatar,
  Button,
  Divider,
  IconButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { AuthContext } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

const Profile = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({
    fullName: "Your Name",
    email: "yourname@gmail.com",
    mobile: "",
    location: "USA",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Profile Picture State
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profilePicture") || "/default-profile.png"
  );

  // Handle profile picture upload
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create a local URL for the uploaded file
    const imagePath = URL.createObjectURL(file);

    // Save to localStorage so it persists
    localStorage.setItem("profilePicture", imagePath);

    // Update state to display the new image
    setProfileImage(imagePath);
  };

  // Fetch User Data
  useEffect(() => {
    let tokenData = token || localStorage.getItem("token");

    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData}`,
          },
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setUserDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (tokenData) fetchUserDetails();
    else {
      setError("No valid token found. Please log in.");
      setLoading(false);
    }
  }, [token]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <ThemeProvider theme={createTheme({ palette: { mode: "light" } })}>
      <Container maxWidth="sm" sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            textAlign: "center",
            width: "800px",
            position: "relative",
            backgroundColor: "rgb(206, 226, 245)",
          }}
        >
          {/* Close Button */}
          <IconButton
            sx={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={() => navigate("/")}
          >
            <CloseIcon />
          </IconButton>

          {/* Profile Picture with Edit Overlay */}
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Avatar
              sx={{ width: 80, height: 80, margin: "auto" }}
              src={profileImage}
              alt="Profile"
            >
              {!profileImage && <PersonIcon fontSize="large" />}
            </Avatar>

            <IconButton
              sx={{
                position: "absolute",
                bottom: "0px",
                right: "0px",
                backgroundColor: "rgb(138, 189, 255)",
                border: "1px solid #ddd",
                width: 25,
                height: 25,
              }}
              component="label"
            >
              <EditIcon fontSize="small" />
              <input type="file" accept="image/*" hidden onChange={handleProfilePictureUpload} />
            </IconButton>
          </Box>

          {/* User Details */}
          <Typography variant="h6" sx={{ mt: 1 }}>
            {userDetails.fullName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {userDetails.email}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Editable Fields */}
          <Box sx={{ textAlign: "left" }}>
            <TextField
              fullWidth
              label="Name"
              variant="standard"
              value={userDetails.fullName}
              onChange={(e) => setUserDetails({ ...userDetails, fullName: e.target.value })}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Email account"
              variant="standard"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Mobile number"
              variant="standard"
              value={userDetails.mobile}
              onChange={(e) => setUserDetails({ ...userDetails, mobile: e.target.value })}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Location"
              variant="standard"
              value={userDetails.location}
              onChange={(e) => setUserDetails({ ...userDetails, location: e.target.value })}
              sx={{ mb: 2 }}
            />
          </Box>

          {/* Save Changes Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => alert("Profile Updated Successfully!")}
          >
            Save Changes
          </Button>

          <Divider sx={{ my: 2 }} />

          {/* User Options (Settings, Notifications, Logout) */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
            <IconButton color="primary" onClick={() => navigate("/settings")}>
              <SettingsIcon />
            </IconButton>
            <IconButton color="primary" onClick={() => navigate("/notifications")}>
              <NotificationsIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
