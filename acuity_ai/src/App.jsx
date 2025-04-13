import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-markup";
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';
import HelpFAQ from './components/pages/HelpFAQ/HelpFAQ';
import Terms from './components/pages/Terms/Terms';
import HowToUse from './components/pages/HowToUse/HowToUse';
import StatusAlert from './components/statusAlert/StatusAlert';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved preference or use system preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) return JSON.parse(savedMode);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Toggle dark mode and save to localStorage
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className={`app-wrapper ${darkMode ? 'dark-mode' : ''}`}>
      <Router>
        <div className="app-layout">
          <StatusAlert />
          <Sidebar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar} 
          />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Main darkMode={darkMode} showSidebar={showSidebar} setShowSidebar={setShowSidebar} />} />
              <Route path="/help" element={<HelpFAQ darkMode={darkMode} />} />
              <Route path="/terms" element={<Terms darkMode={darkMode} />} />
              <Route path="/usage" element={<HowToUse darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
              <Route path="/sidebar" element={<Sidebar darkMode={darkMode}  toggleDarkMode={toggleDarkMode} showSidebar={showSidebar} setShowSidebar={setShowSidebar} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App;