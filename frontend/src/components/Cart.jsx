import React, { useEffect, useState } from 'react';
import { fetchCartItems, removeCartItem } from '../api'; // API functions
import '../Styles/cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [removingItemId, setRemovingItemId] = useState(null); // Track which item is being removed

    // Retrieve user ID from localStorage
    const userId = localStorage.getItem('userId'); // Assuming user ID is stored as 'userId' in localStorage

    useEffect(() => {
        const loadCartItems = async () => {
            if (!userId) {
                setError('Please log in to view your cart.');
                setLoading(false);
                return;
            }

            try {
                const items = await fetchCartItems(userId); // Use userId
                setCartItems(items);
            } catch (err) {
                console.error('Error fetching cart items:', err);
                setError('Failed to load cart items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadCartItems();
    }, [userId]);

    const handleRemove = async (productId) => {
        // Check if productId is valid
        if (!productId) {
            console.error('Invalid product ID:', productId);
            setError('Product ID is invalid.');
            return;
        }

        // Disable the remove button for the specific item being processed
        setRemovingItemId(productId);
        console.log('Removing product:', productId, 'for user:', userId);
        
        try {
            // Call removeCartItem API
            await removeCartItem(userId, productId);
            
            // After successful removal, update the cart by filtering out the removed item
            setCartItems(cartItems.filter((item) => item.product_id !== productId));
            alert('Item removed from cart.');
        } catch (err) {
            console.error('Error in frontend handleRemove:', err);
            setError('Failed to remove item. Please try again.');
        } finally {
            // Reset the removing item ID after the operation
            setRemovingItemId(null);
        }
    };

    if (loading) {
        return <p>Loading your cart...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                cartItems.map((item) => {
                    console.log('Cart Item:', item); // Log the item to check for product_id
                    return (
                        <div key={item.cart_id} className="cart-item">
                            <img src={item.image} alt={item.productName} className="cart-item-image" />
                            <h2>{item.productName}</h2>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button
                                onClick={() => handleRemove(item.Product_id)}
                                disabled={removingItemId === item.Product_id} // Disable only the button being processed
                            >
                                {removingItemId === item.Product_id ? 'Removing...' : 'Remove'}
                            </button>
                        </div>
                    );
                })
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
