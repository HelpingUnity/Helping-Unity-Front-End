import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate login
    const user = { name: 'Mohamed Naja', email };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));

    // Redirect to raising funds page
    navigate('/raising-funds');
  };

  return (
    <div className="sign-in-page">
      <h2>Sign In</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
