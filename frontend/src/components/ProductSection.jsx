import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api'; // Import the fetchProducts function
import '../Styles/products.css'; // Ensure you're using the correct CSS file for styling

const ProductsSection = () => {
    const [products, setProducts] = useState([]);  // State to store products
    const [error, setError] = useState(null);  // State to store any error messages

    // Fetch products on component mount
    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data); // Store fetched products in the state
            } catch (err) {
                setError(err.message); // If there's an error, store it in the error state
            }
        };

        getProducts();  // Call the function to fetch products
    }, []); // Empty dependency array means this runs only on mount

    return (
        <div id="products" className="products-section">
            <h1>Products</h1>
            {/* Display error message if any */}
            {error && <div className="error-message">{error}</div>}

            {/* Display products if available */}
            <div className="products-container">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product-item">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                            <button>Add to Cart</button>
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
