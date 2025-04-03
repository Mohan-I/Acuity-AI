import React, { useContext, useState, useEffect } from "react";
import "./sidebar.css";
import { assets } from "../../assets/icons/assets";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const { prevPrompts, setRecentPrompt, clearChatHistory, deletePrompt, onSent } = useContext(Context);

  const menuItems = [
    { icon: assets.chat_icon, label: 'AI Chat Helper' },
    { icon: assets.template_icon, label: 'Templates', pro: true },
    { icon: assets.project_icon, label: 'My projects', pro: true },
    { icon: assets.stats_icon, label: 'Statistics', pro: true },
    { icon: assets.settings_icon, label: 'Settings' },
    { icon: assets.help_icon, label: 'Updates & FAQ' }
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-expand on desktop, collapse on mobile
      setExtended(!mobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setExtended(!extended);
  };

  const handleDeletePrompt = (index, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this chat?")) {
      deletePrompt(index);
    }
  };

  const handleNewChat = () => {
    clearChatHistory();
    setRecentPrompt("");
    // If you want to immediately start a new empty chat
    onSent(""); // This will depend on your context implementation
  };

  const handleCopyPrompt = (text, index, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000); 
  };

  const handleSelectPrompt = (prompt) => {
    setRecentPrompt(prompt);
    // If you want to immediately load the selected chat
    onSent(prompt); // This will depend on your context implementation
  };

  return (
    <div className={`sidebar ${extended ? "expanded" : "collapsed"} ${isMobile ? "mobile" : "desktop"}`}>
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && extended && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <div className="sidebar-content">
        <div className="top">
          <div className="header">
            <img
              onClick={toggleSidebar}
              className="menu clickable"
              src={assets.menu_icon}
              alt="Menu Icon"
            />
            {extended && <Link to='/' className="main-link"><h2 className="app-name">Acuity AI</h2><span className="app-version">v1.2.0</span></Link>}
          </div>

          <div className="sidebar-controls">
            <button className="control-button minimize" onClick={() => setExtended(false)}>
              <svg viewBox="0 0 10 1">
                <rect x="0" y="0" width="10" height="1" fill="currentColor" />
              </svg>
            </button>
            <button className="control-button maximize" onClick={toggleSidebar}>
              <svg viewBox="0 0 10 10">
                <path d={extended ? "M0,2v8h8V2H0z M7,9H1V3h6V9z" : "M0,0v10h10V0H0z M9,9H1V1h8V9z"} 
                      fill="currentColor" />
              </svg>
            </button>
          </div>
        
          <div 
            className="new-chat clickable"
            onClick={handleNewChat}
          >
            <img src={assets.plus_icon} alt="New Chat Icon" />
            {extended && <p>New Chat</p>}
            {extended && (
              <span className="tooltip">Start a new conversation</span>
            )}
          </div>

          {extended && (
            <div className="recent">
              <p className="recent-title">Recent Chats</p>
              {prevPrompts.length > 0 ? (
                <div className="recent-list">
                  {prevPrompts.map((item, index) => (
                    <div
                      key={index}
                      className="recent-entry clickable"
                      onClick={() => handleSelectPrompt(item)}
                    >
                      <img src={assets.message_icon} alt="Recent Prompt Icon" />
                      <p>{item.length > 40 ? item.slice(0, 40) + "..." : item}</p>
                      <div className="prompt-actions">
                        <button 
                          className="copy-prompt"
                          onClick={(e) => handleCopyPrompt(item, index, e)}
                          title="Copy prompt"
                        >
                          <img 
                            src={copiedIndex === index ? assets.check_icon : assets.copy_icon} 
                            alt={copiedIndex === index ? "Copied!" : "Copy"} 
                            width={2} 
                          />
                        </button>
                        <button 
                          className="delete-prompt"
                          onClick={(e) => handleDeletePrompt(index, e)}
                          title="Delete this chat"
                        >
                          <img src={assets.delete_icon} alt="Delete" width={14} />
                        </button>
                      </div>
                      <span className="tooltip">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-prompts">No recent conversations</p>
              )}
            </div>
          )}
        </div>

        <div className="bottom">
        {extended && (
            <div className="user-profile">
              <div className="profile-image">
                <img src={assets.user_icon} alt="User profile" />
              </div>
              <div className="profile-info">
                <p className="profile-name">Created By</p>
                <p className="profile-email">Mohan S. Yadav</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;