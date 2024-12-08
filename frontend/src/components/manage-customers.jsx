import React, { useEffect, useState } from 'react';
import { fetchCustomers } from '../api'; // Import the fetchCustomers function
import '../Styles/manage-customers.css'; // Ensure you have this CSS file

const ManageCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return <p>Loading customers...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="manage-customers">
            <h1>Manage Customers</h1>
            {customers.length > 0 ? (
                <table className="customers-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Registered At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.user_id}>
                                <td>{customer.user_id}</td>
                                <td>{customer.username}</td>
                                <td>{customer.email}</td>
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
