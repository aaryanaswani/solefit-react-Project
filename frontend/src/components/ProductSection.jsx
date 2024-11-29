import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import '../Styles/index.css';

const ProductsSection = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await fetchProducts();
            setProducts(data);
        };
        getProducts();
    }, []);

    return (
        <section className="products-section">
            <h2>Our Products</h2>
            <div className="products-container">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductsSection;
