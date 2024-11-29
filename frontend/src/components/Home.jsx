import React from 'react';
import ProductsSection from './ProductSection';
import Footer from './Footer';
import '../Styles/Home.css';
import '../Styles/index.css';

const Home = () => {
    return (
        <div className="home">
            <section className="welcome-section">
            <h1>Welcome to Cartsy</h1>
            <p>Your one-stop shop for all your needs!</p>
            </section>
            <ProductsSection />
            <section className="about-section">
            <h2>About Us</h2>
            <p>
                Cartsy is an innovative e-commerce platform designed to provide you with the best shopping experience.
                From daily essentials to unique finds, we've got you covered!
            </p>
            </section>
            <Footer />
        </div>
    );
};

export default Home;
