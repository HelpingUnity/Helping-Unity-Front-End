// src/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  padding: 10px 20px;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const NavItem = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s;

  &:hover {
    color: #ffa500;
  }
`;

const Logo = styled.img`
  height: 40px; /* Adjust height as needed */
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavItem to="/donate">Donate</NavItem>
      <NavItem to="/fundraise">Fundraise</NavItem>
      <NavItem to="/payment">Payment</NavItem>
      {/* <Logo src="path/to/your/logo.png" alt="Logo" /> */}
      <NavItem to="/app">Search</NavItem>
      <NavItem to="/about">About</NavItem>
    </NavbarContainer>
  );
};

export default Navbar;
