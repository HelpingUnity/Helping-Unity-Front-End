import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Home = ({ user }) => {
  const navigate = useNavigate();

  const handleFundraise = () => {
    if (user) {
      navigate('/raising-funds');
    } else {
      navigate('/sign-in');
    }
  };

  return (
    <div className="content">
      <div className="box">
        <h2>Requirement</h2>
        <p>Join Us in</p>
        <button onClick={handleFundraise}>Raising Funds Today!</button>
      </div>
      <div className="box">
        <h2>Your Donations</h2>
        <p>Make a Difference</p>
        <button>Donate Now!</button>
      </div>
    </div>
  );
};

export default Home;
