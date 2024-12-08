import React, { useEffect, useState } from 'react';
import { fetchorders, updateOrderStatus } from '../api'; // Ensure API methods are implemented
import '../Styles/manage-orders.css';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editOrder, setEditOrder] = useState(null); // State to track the order being edited

    const statusOptions = ["Delivered", "Paid", "Pending"]; // Allowed status options

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const orders = await fetchorders();
                setOrders(orders);
            } catch (err) {
                setError(err.message || 'Failed to load orders');
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    // Handle editing an order
    const handleEditOrder = (order) => {
        setEditOrder(order);
    };

    // Handle saving the updated order
    const handleUpdateOrder = async () => {
        try {
            const response = await updateOrderStatus(editOrder.order_id, { status: editOrder.status });
            alert(response.message);

            // Update the local state with the new order status
            setOrders(
                orders.map((order) =>
                    order.order_id === editOrder.order_id
                        ? { ...order, status: editOrder.status }
                        : order
                )
            );

            setEditOrder(null); // Close the edit form
        } catch (err) {
            alert(err.message || 'Failed to update order.');
        }
    };

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
                        <th>Actions</th>
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
                            <td>
                                <button onClick={() => handleEditOrder(order)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Order Form */}
            {editOrder && (
                <div className="edit-order-form">
                    <h2>Edit Order</h2>
                    <label htmlFor="order-status">Status:</label>
                    <select
                        id="order-status"
                        value={editOrder.status}
                        onChange={(e) =>
                            setEditOrder({ ...editOrder, status: e.target.value })
                        }
                    >
                        {statusOptions.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleUpdateOrder}>Save</button>
                    <button onClick={() => setEditOrder(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ManageOrders;
