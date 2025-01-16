import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/AdminNavbar.css'; // Add appropriate styling

const AdminNavbar = () => {
    return (
        <nav className="admin-navbar">
            {/* Left-aligned logo */}
            <div className="admin-logo">
                <Link to="/admin">SoleFit</Link>
            </div>

            {/* Right-aligned login link */}
            <div className="admin-login">
                <Link to="/login/admin">Login</Link>
            </div>
        </nav>
    );
};

export default AdminNavbar;
