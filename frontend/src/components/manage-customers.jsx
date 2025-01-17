import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To handle navigation
import { fetchCustomers } from '../api'; // Import the fetchCustomers function
import '../Styles/manage-customers.css'; // Ensure you have this CSS file

const ManageCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visiblePasswords, setVisiblePasswords] = useState({}); // To track which passwords are visible

    const navigate = useNavigate(); // Use navigate for routing

    useEffect(() => {
        const loadCustomers = async () => {
            try {
                const data = await fetchCustomers(); // Use the API function
                setCustomers(data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch customers.');
                setLoading(false);
            }
        };

        loadCustomers();
    }, []);

    const togglePasswordVisibility = (userId) => {
        setVisiblePasswords((prev) => ({
            ...prev,
            [userId]: !prev[userId], // Toggle visibility for the specific user ID
        }));
    };

    const handleInboxClick = () => {
        navigate('/manage-requests'); // Redirect to ManageRequest page
    };

    if (loading) {
        return <p>Loading customers...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="manage-customers">
            {/* Inbox Icon */}
            <div className="inbox-container">
                <button className="inbox-button" onClick={handleInboxClick}>
                    <span className="inbox-icon">&#128172;</span> {/* Speech bubble icon */}
                    <span className="inbox-text">Inbox</span>
                </button>
            </div>

            <h1>Manage Customers</h1>
            {customers.length > 0 ? (
                <table className="customers-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Registered At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.user_id}>
                                <td>{customer.user_id}</td>
                                <td>{customer.username}</td>
                                <td>{customer.email}</td>
                                <td>
                                    {visiblePasswords[customer.user_id]
                                        ? customer.password // Show password if visible
                                        : '********'} {/* Hide password */}
                                    <button
                                        className="show-password-button"
                                        onClick={() => togglePasswordVisibility(customer.user_id)}
                                    >
                                        {visiblePasswords[customer.user_id] ? 'Hide' : 'Show'}
                                    </button>
                                </td>
                                <td>{new Date(customer.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No customers found.</p>
            )}
        </div>
    );
};

export default ManageCustomers;
