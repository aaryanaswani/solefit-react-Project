import React, { useEffect, useState } from 'react';
import { fetchProducts, handleAddToCart } from '../api';
import { useAuth } from '../context/authcontext'; // Ensure auth context is correctly set up
import '../Styles/products.css';

const ProductsSection = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useAuth(); // Extract the user from AuthContext

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch products.');
            }
        };

        getProducts();
    }, []);

    const handleAddToCartClick = async (product_id,user_id) => {
        if (!user) {
            alert('You need to log in to add items to the cart.');
            return;
        }

        try {
            const quantity = 1; // Default quantity to 1 for adding to cart
            console.log('Adding to cart:', { user_id: user_id, product_id: product_id, quantity });
            await handleAddToCart(user_id, product_id, quantity); // Pass correct parameters
            alert('Product added to cart');
        } catch (err) {
            console.error('Failed to add product to cart:', err);
            alert(err.message || 'Failed to add product to cart.');
        }
    };

    return (
        <div className="products-section">
            <h1>Products</h1>
            {error && <div className="error-message">{error}</div>}
            <div className="products-container">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.Product_id} className="product-item">
                            <img src={product.image} alt={product.Product_name} className="product-image" />
                            <h2>{product.Product_name}</h2>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                            <button onClick={() => handleAddToCartClick(product.Product_id,1)}>Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default ProductsSection;
