// src/pages/ProductsPage.js
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';  // Ensure you're importing the function that fetches products
import '../Styles/products.css';  // Your custom styling for the Products Page

const ProductsPage = () => {
    const [products, setProducts] = useState([]);  // Store products data
    const [loading, setLoading] = useState(true);   // Track loading state
    const [error, setError] = useState(null);       // Store any error message

    useEffect(() => {
        // Fetch products when the component mounts
        const getProducts = async () => {
            try {
                const data = await fetchProducts();  // Fetch product data from backend
                setProducts(data);  // Update the state with fetched products
                setLoading(false);   // Set loading to false after data is fetched
            } catch (err) {
                setError(err.message || 'Failed to load products');
                setLoading(false);   // Set loading to false even if there's an error
            }
        };

        getProducts();  // Call function to fetch products
    }, []);  // Empty dependency array ensures it runs only once on mount

    return (
        <div className="products-page">
            <h1>Our Products</h1>

            {/* Display error message */}
            {error && <div className="error-message">{error}</div>}

            {/* Show loading spinner if products are still being fetched */}
            {loading ? (
                <div className="loading">Loading products...</div>
            ) : (
                <div className="products-list">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="product-card">
                                <img src={product.image} alt={product.name} className="product-image" />
                                <div className="product-info">
                                    <h2>{product.name}</h2>
                                    <p>{product.description}</p>
                                    <p className="price">${product.price}</p>
                                    <button>Add to Cart</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
