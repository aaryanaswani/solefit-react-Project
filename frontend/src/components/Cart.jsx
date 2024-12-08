import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authcontext';
import { fetchCartItems, removeCartItem } from '../api'; // API functions
import '../Styles/cart.css';

const Cart = () => {
    const { user } = useAuth(); // Get logged-in user from AuthContext
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const items = await fetchCartItems(1); // Use user.id
                console.log('Cart Items:', items); // Debugging: Log fetched cart items
                setCartItems(items);
            } catch (err) {
                console.error('Error fetching cart items:', err);
                setError(err.message || 'Failed to load cart.');
            }
        };

        loadCartItems();
    }, [user]);

    const handleRemove = async (productId) => {
        try {
            if (!user || !user.id) {
                setError('Please log in to remove items.');
                return;
            }
            await removeCartItem(user.id, productId); // Use user.id
            setCartItems(cartItems.filter((item) => item.product_id !== productId)); // Update UI after removal
            alert('Item removed from cart.');
        } catch (err) {
            console.error('Error removing cart item:', err);
            setError(err.message || 'Failed to remove item.');
        }
    };

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div key={item.cart_id} className="cart-item">
                        <img src={item.image} alt={item.productName} className="cart-item-image" />
                        <h2>{item.productName}</h2>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => handleRemove(item.product_id)}>Remove</button>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
