import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/admin-dashboard.css'; // Add appropriate styling

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <header className="admin-welcome">
                <h1>Welcome, Admin</h1>
                <p>Manage all aspects of your e-commerce platform from here.</p>
            </header>
            <div className="admin-options">
                <div className="admin-option">
                    <Link to="/manage-customers">Manage Customers</Link>
                </div>
                <div className="admin-option">
                    <Link to="/manage-orders">Manage Orders</Link>
                </div>
                <div className="admin-option">
                    <Link to="/manage-products">Manage Products</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
