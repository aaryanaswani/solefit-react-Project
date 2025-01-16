import React from 'react';
import '../Styles/PrivacyPolicy.css';
import Footer from './Footer';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-page">
            <section className="policy-header">
                <h1>Privacy Policy</h1>
                <p>Your privacy is our priority. Read our policy to understand how we handle your data.</p>
            </section>
            <section className="policy-content">
                <h2>Information We Collect</h2>
                <p>
                    We collect personal data like your name, email, and shipping address to provide better service. 
                    Your data is securely stored and only used for order processing and communication purposes.
                </p>
                <h2>How We Use Your Information</h2>
                <p>
                    Your data is used to enhance your shopping experience, process transactions, and provide customer support.
                </p>
                <h2>Your Rights</h2>
                <p>
                    You have the right to access, modify, or delete your personal data at any time. Contact us for assistance.
                </p>
                <h2>Contact Us</h2>
                <p>
                    For questions or concerns about our privacy policy, reach out to us at privacy@solefit.com.
                </p>
            </section>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
