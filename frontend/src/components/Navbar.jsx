import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = (event, section, route) => {
    if (location.pathname === '/home') {
      event.preventDefault(); // Prevent navigation on the home page
      const targetSection = document.querySelector(section);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to the specified route if not on the home page
      navigate(route);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home" className="logo-link">SOLEFIT</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/home" className="nav-link">Home</Link></li>
        <li>
          <a
            href="#about"
            className="nav-link"
            onClick={(e) => handleLinkClick(e, '#about', '/about-us')}
          >
            About Us
          </a>
        </li>
        <li>
          <a
            href="#products"
            className="nav-link"
            onClick={(e) => handleLinkClick(e, '#products', '/products')}
          >
            Products
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="nav-link"
            onClick={(e) => handleLinkClick(e, '#contact', '/contact-us')}
          >
            Contact Us
          </a>
        </li>
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
