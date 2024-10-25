// src/SignIn.jsx
import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-top: 100px; /* Adjust as needed */
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  color: white;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  background: #ffa500;
  color: white;
  cursor: pointer;

  &:hover {
    background: #ff8c00;
  }
`;

const SignIn = () => {
  return (
    <FormContainer>
      <h2>Sign In</h2>
      <Input type="email" placeholder="Email Address" required />
      <Input type="password" placeholder="Password" required />
      <Button type="submit">Sign In</Button>
    </FormContainer>
  );
};

export default SignIn;
