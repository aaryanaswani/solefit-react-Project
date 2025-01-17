import React from "react";
import "../Styles/PrivacyPolicy.css";
import Footer from './Footer';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      {/* Header Section */}
      <div className="policy-header">
        <h1>Privacy Policy</h1>
        <p>Your privacy matters to us. Learn how we protect your data.</p>
      </div>

      {/* Content Section */}
      <div className="policy-content">
        <h2>Introduction</h2>
        <p>
          At SoleFit, we are committed to safeguarding your personal information. This Privacy Policy explains how we collect, use, and protect your data.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We may collect personal information such as your name, email address, shipping address, and payment details when you interact with our website.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          Your information is used to fulfill your orders, improve your shopping experience, and communicate with you about promotions and updates.
        </p>

        <h2>Data Security</h2>
        <p>
          We use industry-standard security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information. Contact us if you have any concerns about your data.
        </p>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
