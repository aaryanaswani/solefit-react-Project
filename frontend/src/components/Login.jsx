import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext'; // Import AuthContext
import { loginUser } from '../api'; // Ensure this is implemented
import '../Styles/Login.css';

const Login = () => {
    const { panel } = useParams(); // Extract "admin" or "customer" from the URL
    const { login } = useAuth(); // Access login function from AuthContext
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form submission default behavior
        setError(''); // Clear any previous error messages

        try {
            const response = await loginUser({ username, password, panel });

            console.log(response); // Log the response to see the structure

            // Save user data and token dynamically
            localStorage.setItem('userId', response.user.user_id); // Store user ID in localStorage
            localStorage.setItem('token', response.token); // Store token in localStorage
            login(response); // Optionally, save user data in context

            // Navigate based on the panel type
            navigate(panel === 'admin' ? '/admin' : '/home');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Invalid credentials'); // Show error message
        }
    };
    const handleRegisterNavigate = () => {
        // Navigate to the registration page based on panel type (admin or customer)
        if (panel === 'admin') {
            navigate('/adminregister'); // Redirect to admin registration page
        } else {
            navigate('/register'); // Redirect to customer registration page
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>{panel === 'admin' ? 'Admin Login' : 'Customer Login'}</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>

                {/* Register Now Button */}
                <div className="register-now">
                    <p>Don't have an account? <button onClick={handleRegisterNavigate}>Register Now</button></p>
                    
                </div>
            </div>
        </div>
    );
};

export default Login;
