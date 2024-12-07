import React from 'react';
import '../Styles/ContactSection.css';

const ContactSection = () => {
    return (
        <div id="contact" className="contact-section">
            <h1>Contact Us</h1>
            <div className="contact-container">
                {/* Contact Form */}
                
                <div className="contact-form">
                    <h2>Get in Touch</h2>
                    <form>
                        <label htmlFor="name">Name *</label>
                        <input type="text" id="name" placeholder="Enter your name" required />

                        <label htmlFor="email">Email *</label>
                        <input type="email" id="email" placeholder="Enter your email" required />

                        <label htmlFor="phone">Phone *</label>
                        <input type="tel" id="phone" placeholder="Enter your phone number" required />

                        <label htmlFor="message">Message</label>
                        <textarea id="message" placeholder="Write your message here"></textarea>

                        <button type="submit">Send Message</button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <p><strong>Email:</strong> aaryankumar.725@outlook.com</p>
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
