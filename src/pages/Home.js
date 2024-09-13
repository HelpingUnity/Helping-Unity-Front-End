import React, { useState } from 'react';
import axios from 'axios';
import '../css/Home.css';

const Home = () => {
  const [message, setMessage] = useState(null);

  // Sample API call for donations
  const handleDonate = async () => {
    try {
      const response = await axios.post('/api/donations', { amount: 100 });
      setMessage(`Donation Successful: ${response.data.message}`);
    } catch (error) {
      setMessage('Error with the donation process');
    }
  };

  // Sample API call for fundraising
  const handleFundraise = async () => {
    try {
      const response = await axios.post('/api/fundraising', { goal: 5000 });
      setMessage(`Fundraising Goal Set: ${response.data.goal}`);
    } catch (error) {
      setMessage('Error with the fundraising process');
    }
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <nav>
            <a href="#">Donate</a>
            <a href="#">Fundraise</a>
            <a href="#">Payment</a>
            <a href="#">Search</a>
        </nav>
        <div className="logo">
			<img src="./logo.png" alt="Logo" className="logo" />
        </div>
        <div className="navbar-items">
            <a href="#">Login</a>
            <a href="#">SignUp</a>
            <a href="#">About</a>
        </div>
      </header>

      <div className="content">
        <div className="requirement-box">
          <h2>Requirement</h2>
          <p>Join Us in</p>
          <button onClick={handleFundraise}>Raising Funds Today!</button>
        </div>
        <div className="donation-box">
          <h2>Your Donations</h2>
          <p>Make a Difference</p>
          <button onClick={handleDonate}>Donate Now!</button>
        </div>
      </div>

      {message && <div className="message-box">{message}</div>}
    </div>
  );
};

export default Home;
