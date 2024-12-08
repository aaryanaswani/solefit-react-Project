import React, { useEffect, useState } from 'react';
import { fetchProductDetails, addProduct, updateProduct, deleteProduct } from '../api';
import '../Styles/manage-products.css';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editProduct, setEditProduct] = useState(null); // State for editing a product
    const [newProduct, setNewProduct] = useState({
        Product_name: '',
        description: '',
        price: '',
        Stock: '',
        image: '',
    });

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

    const handleAddProduct = async () => {
        try {
            const response = await addProduct(newProduct);
            alert(response.message);
            setProducts([...products, newProduct]);
            setNewProduct({
                Product_name: '',
                description: '',
                price: '',
                Stock: '',
                image: '',
            });
        } catch (err) {
            alert(err.message || 'Failed to add product.');
        }
    };

    const handleEditProduct = (product) => {
        // Set the product to edit
        setEditProduct(product);
    };

    const handleUpdateProduct = async () => {
        try {
            const response = await updateProduct(editProduct.Product_id, editProduct);
            alert(response.message);
            setProducts(
                products.map((product) =>
                    product.Product_id === editProduct.Product_id ? editProduct : product
                )
            );
            setEditProduct(null); // Close the edit form
        } catch (err) {
            alert(err.message || 'Failed to update product.');
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            const response = await deleteProduct(id);
            alert(response.message);
            setProducts(products.filter((product) => product.Product_id !== id));
        } catch (err) {
            alert(err.message || 'Failed to delete product.');
        }
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="manage-products">
            <h1>Manage Products</h1>

            {/* Add New Product */}
            <div className="add-product-form">
                <h2>Add New Product</h2>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.Product_name}
                    onChange={(e) => setNewProduct({ ...newProduct, Product_name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.Stock}
                    onChange={(e) => setNewProduct({ ...newProduct, Stock: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                />
                <button onClick={handleAddProduct}>Add Product</button>
            </div>

            {/* Products Table */}
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.Product_id}>
                            <td>{product.Product_id}</td>
                            <td>{product.Product_name}</td>
                            <td>{product.description || 'No description'}</td>
                            <td>${(Number(product.price) || 0).toFixed(2)}</td>
                            <td>{product.Stock}</td>
                            <td>
                                <button onClick={() => handleEditProduct(product)}>Update</button>
                                <button onClick={() => handleDeleteProduct(product.Product_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Product Form */}
            {editProduct && (
                <div className="edit-product-form">
                    <h2>Edit Product</h2>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={editProduct.Product_name}
                        onChange={(e) =>
                            setEditProduct({ ...editProduct, Product_name: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={editProduct.description}
                        onChange={(e) =>
                            setEditProduct({ ...editProduct, description: e.target.value })
                        }
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={editProduct.price}
                        onChange={(e) =>
                            setEditProduct({ ...editProduct, price: e.target.value })
                        }
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        value={editProduct.Stock}
                        onChange={(e) =>
                            setEditProduct({ ...editProduct, Stock: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={editProduct.image}
                        onChange={(e) =>
                            setEditProduct({ ...editProduct, image: e.target.value })
                        }
                    />
                    <button onClick={handleUpdateProduct}>Save</button>
                    <button onClick={() => setEditProduct(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ManageProducts;
