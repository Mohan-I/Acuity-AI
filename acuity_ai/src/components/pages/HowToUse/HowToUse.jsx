import React from 'react';
import './HowToUse.css';

const HowToUse = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className={`HowToUse-container ${darkMode ? 'dark-mode' : ''}`}>
      <h1>How to Use Acuity AI</h1>
      <div className="htu-option">
        <h3>Basic Usage</h3>
        <p>
          To start using Acuity AI, simply type your question or request in the
          input field and press enter or click the send button. Acuity AI will
          process your input and provide a relevant response.
        </p>
      </div>

      <div className="htu-option">
        <h3>Uploading Files</h3>
        <p>
          You can upload images or documents for analysis. Click the gallery icon
          to select and upload your files. Acuity AI supports various file
          formats, including JPEG, PNG, PDF, and DOCX.
        </p>
      </div>

      <div className="htu-option">
        <h3>Dark Mode</h3>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          Enable Dark Mode
        </label>
        <p>
          Toggle dark mode to switch between light and dark themes for better
          viewing experience, especially in low-light environments.
        </p>
      </div>

      <div className="htu-option">
        <h3>Conversation History</h3>
        <p>
          Acuity AI saves your conversation history, allowing you to review past
          interactions. You can access your history via the history or saved
          conversations option in the menu.
        </p>
      </div>

      <div className="htu-option">
        <h3>Providing Feedback</h3>
        <p>
          If you encounter any issues or have suggestions for improvement, please
          contact our support team at support@acuityai.com. Your feedback is
          valuable to us.
        </p>
      </div>

       <div className="htu-option">
        <h3>System Requirements</h3>
        <p>
          Acuity AI is accessible via modern web browsers on desktop and mobile
          devices. A stable internet connection is required for optimal
          performance.
        </p>
      </div>
    </div>
  );
};

export default HowToUse;