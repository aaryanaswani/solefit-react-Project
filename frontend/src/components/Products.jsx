import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import { useCart } from '../context/CartContext';
import '../Styles/index.css';
//import { fetchProducts } from '../api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const { dispatch } = useCart();

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await fetchProducts();
            setProducts(data);
        };
        getProducts();
    }, []);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    return (
        <div>
            <h1>Products</h1>
            <div>
                {products.map((product) => (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
