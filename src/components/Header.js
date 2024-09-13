import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Header = ({ user, onLogout }) => {
  return (
    <header className="navbar">
      <div className="logo">
        <img src="./logo.png" alt="Logo" className="logo" />
      </div>
      <nav>
        <ul className="navbar-items">
          <li><a href="/">Donate</a></li>
          <li><a href="/">Fundraise</a></li>
          <li><a href="/">Payment</a></li>
          <li><a href="/SignUp">Search</a></li>
        </ul>
      </nav>
      <div className="navbar-items">
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
		<>
          <a href="/sign-in">Login</a>
          <a href="/SignUp">SignUp</a>
		</>
        )}
      </div>
    </header>
  );
};

export default Header;
