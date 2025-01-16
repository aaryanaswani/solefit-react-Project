import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home" className="logo-link">SOLEFIT</Link>
      </div>

      <ul className="navbar-links">
        <li><a href="/home" className="nav-link">Home</a></li>
        <li><a href="#about" className="nav-link">About Us</a></li>
        <li><a href="#products" className="nav-link">Products</a></li>
        <li><a href="#contact" className="nav-link">Contact Us</a></li>
      </ul>

      <div className="navbar-right">
        {isLoggedIn ? (
          <button onClick={onLogout} className="logout-button">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        ) : (
          <Link to="/login" className="login-button">
            <i className="fas fa-user"></i>
          </Link>
        )}
        <Link to="/cart" className="cart-button">
          <i className="fas fa-shopping-bag"></i>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
