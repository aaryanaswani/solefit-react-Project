import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, dispatch } = useCart();

    const removeFromCart = (product) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    };

    return (
        <div>
            <h1>Your Cart</h1>
            {cart.map((item) => (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <p>${item.price}</p>
                    <button onClick={() => removeFromCart(item)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Cart;