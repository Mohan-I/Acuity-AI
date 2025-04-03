import React, { useState } from 'react';
import { assets } from '../../../assets/icons/assets';
import './help.css';

const HelpFAQ = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = [
    {
        question: "How do I use Acuity AI?",
        answer: "Simply type your question in the input field and press enter. Acuity AI will process your input and provide relevant responses."
      },
      {
        question: "Can I upload files for analysis?",
        answer: "Yes, you can upload images or documents for analysis. Supported formats include JPEG, PNG, PDF, and DOCX."
      },
      {
        question: "What types of questions can Acuity AI answer?",
        answer: "Acuity AI can assist with factual inquiries, explanations, document analysis, and task automation."
      },
      {
        question: "How accurate is Acuity AI's response?",
        answer: "Acuity AI provides accurate responses but may sometimes produce incorrect information. Verify critical data from trusted sources."
      },
      {
        question: "Is my data secure?",
        answer: "Yes, we follow strict security protocols. Your data is processed securely and not stored unless required for service."
      },
      {
        question: "What are the system requirements for Acuity AI?",
        answer: "Acuity AI works on modern web browsers on desktop and mobile devices. A stable internet connection is required."
      },
      {
        question: "How do I report a problem or provide feedback?",
        answer: "For issues or feedback, contact support at support@acuityai.com or visit our Help Center."
      },
      {
        question: "Can I save my conversations?",
        answer: "Yes, you can save your chat history using the export button in the chat interface."
      },
      {
        question: "Does Acuity AI support multiple languages?",
        answer: "Currently, Acuity AI supports English, Spanish, and French, with more languages coming soon."
      },
      {
        question: "How can I reset my password?",
        answer: "Go to Settings > Account > Change Password and follow the instructions. If you forgot your password, use the 'Forgot Password' option on the login page."
      }  
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`help-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="help-header">
        <div className="header-content">
          <img src={assets.question_icon} alt="Help Icon" className="header-icon" />
          <h1>Help & FAQ</h1>
        </div>
        <p className="header-description">
          Find answers to commonly asked questions about Acuity AI. If you need further assistance, feel free to contact us.
        </p>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a question..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        
        <div className="faq-list">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-card ${expandedFAQ === index ? 'expanded' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <span className="toggle-icon">
                    {expandedFAQ === index ? '−' : '+'}
                  </span>
                </div>
                {expandedFAQ === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No matching FAQs found. Try a different search term.</p>
            </div>
          )}
        </div>
      </div>

      <div className="support-section">
        <h2 className="section-title">Need More Help?</h2>
        <p className="support-description">
          If your question isn't answered here, our support team is ready to assist you.
        </p>
        <div className="contact-methods">
          <div className="contact-card">
            <span className="contact-icon">✉️</span>
            <h4>Email Support</h4>
            <a href="mailto:support@acuityai.com">support@acuityai.com</a>
          </div>
          <div className="contact-card">
            <span className="contact-icon">📞</span>
            <h4>Phone Support</h4>
            <p>+1 (800) 555-1234</p>
          </div>
          <div className="contact-card">
            <span className="contact-icon">💬</span>
            <h4>Live Chat</h4>
            <p>9 AM - 6 PM (Mon-Fri)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpFAQ;