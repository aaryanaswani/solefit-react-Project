import React, { useEffect, useState } from 'react';
import { fetchProductDetails } from '../api'; // Import the API function
import '../Styles/manage-products.css'; // Create/manage the CSS file

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productData = await fetchProductDetails();
                setProducts(productData);
            } catch (err) {
                setError(err.message || 'Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (products.length === 0) return <p>No products found.</p>;

    return (
        <div className="manage-products">
            <h1>Manage Products</h1>
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.Product_id}>
                            <td>{product.Product_id}</td>
                            <td>{product.Product_name}</td>
                            <td>{product.description || 'No description provided'}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.Stock}</td>
                            <td>{product.createdAt ? new Date(product.createdAt).toLocaleString() : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProducts;
