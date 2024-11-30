import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loginUser } from '../api'; // Ensure this is implemented
import '../Styles/Login.css';

const Login = () => {
    const { panel } = useParams(); // Extract "admin" or "customer" from the URL
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form submission default behavior
        setError(''); // Clear any previous error messages

        try {
            const response = await loginUser({ username, password, panel });

            // Store user data in localStorage or sessionStorage
            localStorage.setItem('user', JSON.stringify(response));

            // Navigate based on the panel type
            navigate(panel === 'admin' ? '/admin' : '/home');
        } catch (err) {
            setError(err); // Show error message
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
                <p>
                    Don't have an account? <a href="/register">Register here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
