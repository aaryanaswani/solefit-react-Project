import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Login user
export const loginUser = async ({ username, password, panel }) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
        panel,
    });
    return response.data;
};

// register user
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to register user.');
        }

        return data;
    } catch (error) {
        console.error('Error registering user:', error.message);
        throw error;
    }
};

// New fetchProducts function
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data; // Return the products data
    } catch (err) {
        throw new Error(err.response?.data?.message || 'Failed to fetch products.');
    }
};

// Add product to cart
export const handleAddToCart = async (user_id, product_id, quantity) => {
    try {
        const response = await fetch('http://localhost:5000/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, product_id, quantity }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add to cart');
        }

        return await response.json();
    } catch (err) {
        console.error('Error in handleAddToCart:', err);
        throw err;
    }
};


export const addToCart = async (user_id, product_id, quantity) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cart/add`, {
            user_id,
            product_id,
            quantity,
        });
        return response.data;
    } catch (err) {
        console.error('Add to Cart Error:', err.response?.data || err.message);
        throw err;
    }
};

export const fetchCartItems = async (user_id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cart/${user_id}`);
        return response.data;
    } catch (err) {
        console.error("Error fetching cart items:", err);
        throw err;
    }
};

// Remove item from cart
export const removeCartItem = async (user_id, product_id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/cart/${user_id}/${product_id}`);
        return response.data;
    } catch (error) {
        console.error('Error removing cart item:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to remove cart item.');
    }
};

// Place an order
export const placeOrder = async (user_id, address) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/orders/place`, {
            user_id,
            address,
        });
        return response.data;
    } catch (error) {
        console.error('Error placing order:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to place order.');
    }
};

// Fetch user orders
export const fetchOrders = async (user_id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders/${user_id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch orders.');
    }
};


//admin routes
export const fetchCustomers = async () => {
    const response = await axios.get(`${API_BASE_URL}/customers`);
    return response.data;
};

export const fetchProductDetails = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/mproducts`);
        return response.data; // Return the product details
    } catch (error) {
        console.error('Error fetching product details:', error.message);
        throw new Error('Failed to fetch product details.');
    }
};

// Add a new product
export const addProduct = async (productData) => {
    const response = await axios.post(`${API_BASE_URL}/mproducts/add`, productData);
    return response.data;
};

// Update an existing product
export const updateProduct = async (id, productData) => {
    const response = await axios.put(`${API_BASE_URL}/mproducts/update/${id}`, productData);
    return response.data;
};

// Delete a product
export const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/mproducts/delete/${id}`);
    return response.data;
};


// Fetch all orders
export const fetchorders = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/morders`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        throw new Error('Failed to fetch orders.');
    }
};

// Update order status
export const updateOrderStatus = async (orderId, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/morders/${orderId}/status`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error.message);
        throw new Error('Failed to update order status.');
    }
};