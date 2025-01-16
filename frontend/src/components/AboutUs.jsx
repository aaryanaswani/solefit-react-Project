import React from 'react';
import '../Styles/AboutUs.css';
import Footer from './Footer';
import image from '../Styles/images/about.png';

const AboutUs = () => {
    return (
        <div className="about-us-page">
            <section className="about-us-hero">
                <div className="hero-text">
                    <h1>About Us</h1>
                    <p>
                        We are dedicated to crafting footwear that inspires confidence and brings comfort. 
                        Join us as we redefine style, one step at a time.
                    </p>
                </div>
            </section>
            <section className="about-us-content">
                <div className="text-section">
                    <h2>Our Mission</h2>
                    <p>
                        At SOLEFIT, our mission is to merge functionality and fashion, creating shoes that speak to your individuality. 
                        Every step you take tells a story, and we’re here to make sure it’s one of style and comfort.
                    </p>
                    <h2>Our Story</h2>
                    <p>
                        Founded in Karachi, Pakistan, we began with a simple idea: to revolutionize the footwear industry. 
                        Our journey is fueled by passion and creativity, inspired by the belief that great shoes can transform lives.
                    </p>
                </div>
                <div className="image-section">
                    <img src={image} alt="Our Team" />
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default AboutUs;
