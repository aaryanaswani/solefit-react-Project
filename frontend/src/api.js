import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const loginUser = async ({ username, password, panel }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            username,
            password,
            panel,
        });
        return response.data; // Return user data
    } catch (err) {
        // Throw a meaningful error message
        const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
        throw errorMessage; // Ensure the thrown error is a string
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