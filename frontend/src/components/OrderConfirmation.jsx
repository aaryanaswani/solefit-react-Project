import React, { useState, useEffect } from "react";
import { getOrderDetails } from "../api"; // Import the API function
import '../Styles/OrderConfirmation.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';


const OrderConfirmation = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [order, setOrder] = useState(null); // State to store order data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error

  // Fetch order details when the component mounts
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderData = await getOrderDetails(); // Call the API function
        setOrder(orderData); // Set order data in state
      } catch (err) {
        setError("Failed to fetch order details");
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchOrderDetails(); // Fetch order details
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading text while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there's an error
  }

  return (
    <div className="order-page">
      {/* Main Section */}
      <div className="order-main">
        <div className="order-header">
          <h1>Order Confirmation</h1>
          <div className="order-info">
            <p className="order-id">Order #{order.orderId}</p>
            <h2>Thank you, {order.username}!</h2>
          </div>
        </div>
        <div className="order-updates">
          <h3>Order Updates</h3>
          <p>You will receive order and shipping updates via email.</p>
        </div>
        <div className="order-details">
          <h4>Contact Information</h4>
          <p>{order.email}</p>
          <h4>Shipping Address</h4>
          <p>{order.address}</p>
          <h4>Payment Method</h4>
          <p>{order.payment_method}</p>
        </div>
        <button className="continue-shopping" onClick={() => navigate('/home')}>Continue Shopping</button>
      </div>

      {/* Sidebar Section */}
      <div className="order-sidebar">
        <h3>Your Order</h3>
        {order.items.map((item, index) => (
          <div className="order-item" key={index}>
            <img src={item.image} alt={item.product_name} />
            <p>{item.product_name}</p>
            <p className="quantity">Quantity: {item.quantity}</p>
            <p className="price">Price: {item.price}</p>
          </div>
        ))}
        <div className="order-summary">
          <p>Subtotal: PKR {order.total_price - 220}</p>
          <p>Shipping: PKR 220</p>
          <h4>Total: PKR {order.total_price}</h4>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
