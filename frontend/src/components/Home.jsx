import React from 'react';
import ProductsSection from './ProductSection';
import Footer from './Footer';
import '../Styles/Home.css';
import '../Styles/index.css';
import ContactSection from './Contact_Page';
import image from '../Styles/images/about.png'

const Home = () => {
    return (
        <div id="welcome" className="home">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Step into style</h1>
                    <p>Elevate your footwear game</p>
                    <a href="#products" className="cta-button">View Products</a>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
            <h1>About Us</h1>
                <div className="about-content">
                    <h2>Unleash your footwear passion</h2>
                    <p>
                        At Cartsy, we craft shoes that blend comfort with cutting-edge style in Karachi, PK.
                        Our mission is to empower individuals to express themselves through footwear
                        that not only looks good but feels great.
                    </p>
                    <a href="#contact" className="link-button">Get in touch</a>
                </div>
                <div className="about-image">
                    <img src= {image} alt="Shoes" />
                </div>
            </section>

            {/* Products Section */}
            <ProductsSection />
            {/* Contact Section*/}
            <ContactSection />
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
