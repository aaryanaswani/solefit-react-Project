import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Login user
export const loginUser = async ({ username, password, panel }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            username,
            password,
            panel,
        });

        return response.data; // Ensure the server sends the correct response structure
    } catch (error) {
        console.error('Login error:', error);
        throw error; // Ensure the error is thrown so we can catch it in the component
    }
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
        throw error; // Rethrow to handle it in the component
    }
};

// registerAdmin
export const registerAdmin = async (adminData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adminData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to register admin.');
        }

        return data;
    } catch (error) {
        console.error('Error registering admin:', error.message);
        throw error; // Rethrow to handle it in the component
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

// ContactRequests
export const sendContactRequest = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/contact`, formData);
        return response.data;
    } catch (error) {
        console.error('Error sending contact request:', error.response?.data || error.message);
        throw new Error('Failed to send contact request');
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
export const ordernow = async (orderPayload) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/orders/place`, orderPayload);
        localStorage.setItem('order_id', response.data.order_id);
        return response.data;
    } catch (error) {
        console.error('Error placing order:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to place order.');
    }
};

export const getOrderDetails = async () => {
    const order_id = localStorage.getItem('order_id'); // Retrieve order_id from localStorage
    
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/${order_id}`); // Call the API to get order details
      return response.data; // Return order details
    } catch (error) {
      console.error("Error fetching order details:", error);
      throw error; // Throw error if API call fails
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

export const fetchRequests = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/mrequests`);
        return response.data; // Return the product details
    } catch (error) {
        console.error('Error fetching product details:', error.message);
        throw new Error('Failed to fetch product details.');
    }
};

export const updateRequestStatus = async (requestId, responseMessage) => {
    try {

        const res = await axios.put(`${API_BASE_URL}/mrequests/${requestId}`, {
            response: responseMessage,
        });
        return res.data; // Renaming 'response' to 'res' here to avoid the conflict
    } catch (error) {
        console.error('Error updating request:', error.message);
        throw new Error('Failed to update request.');
    }
};