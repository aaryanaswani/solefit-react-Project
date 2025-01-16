import React from 'react';
import '../Styles/index.css'; // Ensure this is imported for the footer styles

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                {/* Footer Text */}
                <p>&copy; 2024 SoleFit. All rights reserved.</p>

                {/* Social Media Links */}
                <div className="social-icons">
                    <a href="https://facebook.com" target="" rel="noopener noreferrer">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>

                {/* Footer Navigation Links */}
                <ul className="footer-links">
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
