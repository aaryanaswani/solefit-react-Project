import React, { useEffect, useState } from 'react';
import { fetchCartItems, ordernow } from '../api'; // Import ordernow from api.js
import { useNavigate } from 'react-router-dom';
import '../Styles/Checkout.css';

function Checkout() {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const user_id = localStorage.getItem('userId');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const data = await fetchCartItems(user_id);
        setCartProducts(data);
        const total = data.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        );
        setTotalAmount(total);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    if (user_id) {
      getCartItems();
    }
  }, [user_id]);

  const finalAmount = totalAmount + 220;

  const handlePayNow = async () => {
    const requiredFields = ['email', 'firstname', 'lastname', 'address', 'city', 'phone', 'country', 'payment-method'];
    const newErrors = {};
    const orderData = {};

    requiredFields.forEach((field) => {
      const value = document.getElementById(field).value.trim();
      orderData[field] = value;
      if (!value) {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length === 0) {
      try {
        const orderPayload = {
          user_id,
          address: orderData.address,
          total_price: finalAmount,
          cartProducts: cartProducts.map((product) => ({
            product_id: product.Product_id,
            quantity: product.quantity,
            price: product.price,
          })),
          payment_method: orderData['payment-method'],
        };

        // Call ordernow function from api.js
        await ordernow(orderPayload);
        // Navigate to OrderPlaced page
        navigate('/OrderConfirmation');
      } catch (error) {
        console.error('Error processing order:', error);
        alert('Failed to process order. Please try again.');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-main">
        {/* Left side: Form Section */}
        <div className="checkout-left">
          <div className="checkout-section">
            <h2>Contact</h2>
            <form id="contact-form">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
                className={errors.email ? 'error' : ''}
              />
              <div className="checkbox-section">
                <label htmlFor="newsletter">
                  <input type="checkbox" id="newsletter" name="newsletter" />
                  Email me with news and offers
                </label>
              </div>
            </form>
          </div>

          <div className="checkout-section">
            <h2>Delivery</h2>
            <form id="delivery-form">
              <select id="country" name="country" required className={errors.country ? 'error' : ''}>
                <option value="">Select Country</option>
                <option value="Pakistan">Pakistan</option>
                <option value="United States">United States</option>
                {/* Additional countries */}
              </select>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="First Name"
                required
                className={errors.firstname ? 'error' : ''}
              />
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Last Name"
                required
                className={errors.lastname ? 'error' : ''}
              />
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Street Address"
                required
                className={errors.address ? 'error' : ''}
              />
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                required
                className={errors.city ? 'error' : ''}
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone Number"
                required
                className={errors.phone ? 'error' : ''}
              />
            </form>
          </div>

          <div className="checkout-section">
            <h2>Payment Options</h2>
            <form id="payment-form">
              <select
                id="payment-method"
                name="payment-method"
                required
                className={errors['payment-method'] ? 'error' : ''}
              >
                <option value="">Select Payment Method</option>
                <option value="card">Card</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </form>
          </div>

          <div className="checkout-section">
            <button className="pay-now-btn" onClick={handlePayNow}>
              Place order 
            </button>
          </div>
        </div>

        {/* Right side: Cart Summary */}
        <div className="checkout-right">
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cartProducts.map((product) => (
              <div key={product.cart_id} className="order-item-details">
                <img src={product.image} alt={product.productName} className="product-image" />
                <div className="product-info">
                  <span className="product-name">{product.productName}</span>
                  <span className="product-variant">{product.productVariant}</span>
                  <div className="product-price">
                    Rs. {product.price} x {product.quantity} = Rs. {product.price * product.quantity}
                  </div>
                </div>
              </div>
            ))}
            <div className="cost-summary">
              <div className="cost-item">
                <span>Subtotal</span>
                <span>Rs. {totalAmount}</span>
              </div>
              <div className="cost-item">
                <span>Shipping</span>
                <span>Rs. 220.00</span>
              </div>
              <div className="cost-item total-cost">
                <span>Total</span>
                <span>Rs. {finalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
