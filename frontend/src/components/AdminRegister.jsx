import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAdmin } from '../api'; // Make sure this API function is implemented
import '../Styles/Register.css';

const AdminRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
    
        try {
            // Submit form data to the backend API for admin registration
            const response = await registerAdmin(formData);
            setSuccess(response.message || 'Admin registration successful!');
            setFormData({ username: '', email: '', password: '' }); // Clear form fields
            setTimeout(() => navigate('/login/admin'), 3000); // Redirect to login after 3 seconds
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register admin.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1>Admin Register</h1>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <form onSubmit={handleRegister}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={(e) =>
                            setFormData({ ...formData, username: e.target.value })
                        }
                        required
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        required
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default AdminRegister;
