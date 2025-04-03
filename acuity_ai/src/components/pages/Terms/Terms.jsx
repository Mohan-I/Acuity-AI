import React, { useState } from 'react';
import { assets } from '../../../assets/icons/assets';
import './Terms.css';

const TermsAndPrivacy = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('terms');

  return (
    <div className={`legal-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="legal-header">
        <img src={assets.document_icon} alt="Legal Documents" className="header-icon" />
        <h1>Legal Documents</h1>
      </div>

      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === 'terms' ? 'active' : ''}`}
          onClick={() => setActiveTab('terms')}
        >
          Terms & Conditions
        </button>
        <button 
          className={`tab-button ${activeTab === 'privacy' ? 'active' : ''}`}
          onClick={() => setActiveTab('privacy')}
        >
          Privacy Policy
        </button>
      </div>

      <div className="legal-content">
        {activeTab === 'terms' ? (
          <div className="terms-section">
            <h2>Terms of Service</h2>
            <p className="effective-date">Last Updated: June 15, 2023</p>
            
            <div className="legal-section">
              <h3>1. Acceptance of Terms</h3>
              <p>By accessing or using Acuity AI ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.</p>
            </div>

            <div className="legal-section">
              <h3>2. Description of Service</h3>
              <p>Acuity AI provides artificial intelligence-powered assistance including but not limited to answering questions, generating content, and analyzing data. We reserve the right to modify or discontinue the Service at any time.</p>
            </div>

            <div className="legal-section">
              <h3>3. User Responsibilities</h3>
              <ul>
                <li>You must be at least 13 years old to use this Service</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You agree not to use the Service for any illegal or unauthorized purpose</li>
                <li>You will not upload harmful or malicious content</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>4. Intellectual Property</h3>
              <p>All content and technology comprising the Service are owned by Acuity AI or its licensors. You may not copy, modify, distribute, or reverse engineer any part of the Service.</p>
            </div>

            <div className="legal-section">
              <h3>5. Limitation of Liability</h3>
              <p>Acuity AI shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of or inability to use the Service.</p>
            </div>

            <div className="legal-section">
              <h3>6. Changes to Terms</h3>
              <p>We reserve the right to modify these terms at any time. We will provide notice of significant changes through the Service interface or via email.</p>
            </div>
          </div>
        ) : (
          <div className="privacy-section">
            <h2>Privacy Policy</h2>
            <p className="effective-date">Last Updated: June 15, 2023</p>
            
            <div className="legal-section">
              <h3>1. Information We Collect</h3>
              <p>We collect information to provide better services to our users:</p>
              <ul>
                <li><strong>Account Information:</strong> Name, email, contact details when you register</li>
                <li><strong>Usage Data:</strong> Queries, interactions, and preferences</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>2. How We Use Information</h3>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Develop new features and functionality</li>
                <li>Personalize your experience</li>
                <li>Communicate with you about updates and offers</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>3. Data Sharing</h3>
              <p>We do not sell your personal data. We may share information with:</p>
              <ul>
                <li>Service providers who assist in operating our services</li>
                <li>Legal authorities when required by law</li>
                <li>Affiliates and subsidiaries for business operations</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>4. Data Security</h3>
              <p>We implement appropriate technical and organizational measures to protect your data, including encryption, access controls, and regular security audits.</p>
            </div>

            <div className="legal-section">
              <h3>5. Your Rights</h3>
              <p>Depending on your jurisdiction, you may have rights to:</p>
              <ul>
                <li>Access, correct, or delete your personal data</li>
                <li>Object to or restrict processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </div>

            <div className="legal-section">
              <h3>6. Cookies and Tracking</h3>
              <p>We use cookies and similar technologies to analyze trends, administer the website, and track user movements. You can control cookies through your browser settings.</p>
            </div>
          </div>
        )}

        <div className="contact-legal">
          <h3>Contact Us</h3>
          <p>If you have questions about these policies, please contact us at:</p>
          <p><strong>Email:</strong> legal@acuityai.com</p>
          <p><strong>Mailing Address:</strong> 123 AI Plaza, Tech City, TC 12345</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPrivacy;