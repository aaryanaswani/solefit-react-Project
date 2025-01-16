import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="landing-container">
            <h1>Welcome to Cartsy</h1>
            <h2>Where Shoes Find You</h2>
            <p>Select your panel to proceed:</p>
            <div className="landing-buttons">
                <button onClick={() => navigate('/login/admin')}>Admin Panel</button>
                <button onClick={() => navigate('/login/customer')}>Customer Panel</button>
            </div>
        </div>
    );
};

export default LandingPage;
