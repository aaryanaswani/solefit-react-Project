import React, { useState } from 'react';
import { loginUser } from '../api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser({ username, password });
            localStorage.setItem('token', data.token);
            alert('Login successful');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
