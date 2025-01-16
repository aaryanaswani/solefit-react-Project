import React, { useEffect, useState } from 'react';
import { fetchCartItems, removeCartItem } from '../api';
import '../Styles/cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [removingItemId, setRemovingItemId] = useState(null);

    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const loadCartItems = async () => {
            if (!userId) {
                setError('Please log in to view your cart.');
                setLoading(false);
                return;
            }

            try {
                const items = await fetchCartItems(userId);
                setCartItems(items);
            } catch (err) {
                setError('Failed to load cart items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadCartItems();
    }, [userId]);

    const handleRemove = async (productId) => {
        setRemovingItemId(productId);
        try {
            await removeCartItem(userId, productId);
            setCartItems(cartItems.filter((item) => item.product_id !== productId));
        } catch (err) {
            setError('Failed to remove item. Please try again.');
        } finally {
            setRemovingItemId(null);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (loading) {
        return <p>Loading your cart...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="cart-container">
            <h1>Your Shopping Cart</h1>
            {cartItems.length > 0 ? (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.cart_id} className="cart-item">
                                <img src={item.image} alt={item.productName} className="cart-item-image" />
                                <div className="cart-item-info">
                                    <h2>{item.productName}</h2>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <button
                                    className="remove-button"
                                    onClick={() => handleRemove(item.Product_id)}
                                    disabled={removingItemId === item.Product_id}
                                >
                                    {removingItemId === item.Product_id ? 'Removing...' : 'Remove'}
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;