import React, { useEffect, useState } from 'react';
import { fetchorders } from '../api'; // Ensure this is implemented
import '../Styles/manage-orders.css';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const orders = await fetchorders();
                console.log('Orders:', orders); // Debugging
                setOrders(orders);
            } catch (err) {
                setError(err.message || 'Failed to load orders');
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!orders || orders.length === 0) return <p>No orders found.</p>;

    return (
        <div className="manage-orders">
            <h1>Manage Orders</h1>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User ID</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            <td>{order.user_id}</td>
                            <td>${order.total_price.toFixed(2)}</td>
                            <td>{order.status}</td>
                            <td>{order.created_at ? new Date(order.created_at).toLocaleString() : 'N/A'}</td>
                            <td>{order.address || 'No address provided'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageOrders;
