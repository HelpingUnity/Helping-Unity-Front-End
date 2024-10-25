import React from 'react';
import Navbar from './layout/Navbar';
import SignIn from './users/Signin';
import SignUp from './users/Signup';
import styled from 'styled-components';
import Donate from './pages/Donate';
import Fundraise from './pages/Fundraise';
import Payment from './pages/Payment';
import About from './pages/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppContainer = styled.div`
  height: 100vh; /* For scrolling purpose */
  background-color:white;
  color: black;


`;

function App() {
  return (
    <Router>
      <Navbar />
      <AppContainer>
      <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/Fundraise" element={<Fundraise />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
        </Routes>
      </AppContainer>

    </Router>
  );
}

export default App;
