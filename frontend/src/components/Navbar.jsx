import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css'; // Ensure you have the updated styles linked

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* Left-aligned Logo */}
            <div className="navbar-logo">
                <Link to="/">CARTSY</Link>
            </div>

            {/* Center-aligned Navigation Links */}
            <ul className="navbar-links">
            <li><a href="#welcome">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#contact">Contact Us</a></li>
            </ul>

            {/* Right-aligned Buttons */}
            <div className="navbar-right">
                <Link to="/login" className="login-button">Login</Link>
                <Link to="/cart" className="cart-button">Cart</Link>
            </div>
        </nav>
    );
};

export default Navbar;
