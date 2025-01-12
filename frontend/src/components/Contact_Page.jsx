import React, { useState, useEffect } from 'react';
import '../Styles/ContactSection.css';
import { sendContactRequest } from '../api';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        userId: ''
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Retrieve the userId from localStorage (or from your global state/context)
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setFormData(prevData => ({ ...prevData, userId: storedUserId }));
        } else {
            setError('User not logged in');
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await sendContactRequest(formData);
            setResponseMessage(response.message);
            setFormData({ name: '', email: '', phone: '', message: '', userId: formData.userId });
            setError('');
        } catch (err) {
            setError(err.message);
            setResponseMessage('');
        }
    };

    return (
        <div id="contact" className="contact-section">
            <h1>Contact Us</h1>
            <div className="contact-container">
                <div className="contact-form">
                    <h2>Get in Touch</h2>
                    {responseMessage && <p className="success-message">{responseMessage}</p>}
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name *</label>
                        <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />

                        <label htmlFor="email">Email *</label>
                        <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />

                        <label htmlFor="phone">Phone *</label>
                        <input type="tel" id="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" required />

                        <label htmlFor="message">Message</label>
                        <textarea id="message" value={formData.message} onChange={handleChange} placeholder="Write your message here"></textarea>

                        <button type="submit">Send Message</button>
                    </form>
                </div>

                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <p><strong>Email:</strong> services.cartsy@gmail.com</p>
                    <p><strong>Phone:</strong> +1-234-567-890</p>
                    <p><strong>Location:</strong> Karachi, SD, PK</p>
                    <div className="map-placeholder">
                        <p>Map will appear here or replace with Google Maps iframe.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
