import React, { useState, useRef, useEffect } from "react";
import "./userProfile.css";
import { assets } from "../../assets/icons/assets"; 
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedAvatar, setSelectedAvatar] = useState(assets.user_icon);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAvatarChange = (newAvatar) => {
    setSelectedAvatar(newAvatar);
    setIsDropdownOpen(false); 
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="user-dropdown-container" ref={dropdownRef}>
      <img
        src={selectedAvatar}
        alt="User profile"
        className="user-avatar"
        onClick={toggleDropdown}
        style={{ cursor: "pointer" }}
      />
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="avatar-selection">
            <img
              src={assets.user_icon}
              alt="Avatar 1"
              onClick={() => handleAvatarChange(assets.user_icon)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={assets.user_icon2}
              alt="Avatar 2"
              onClick={() => handleAvatarChange(assets.user_icon2)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={assets.user_icon3}
              alt="Avatar 3"
              onClick={() => handleAvatarChange(assets.user_icon3)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="bottom">
            <Link to="/help" className="bottom-item clickable">
              <img src={assets.question_icon} alt="Help Icon" />
              <p className="item-link">Help & FAQ</p>
              <span className="tooltip">Get help with Acuity AI</span>
            </Link>
            <Link to="/terms" className="bottom-item clickable">
              <img src={assets.history_icon} alt="Activity Icon" />
              <p className="item-link">Terms & Conditions</p>
              <span className="tooltip">Terms & conditions</span>
            </Link>
            <Link to="/usage" className="bottom-item clickable">
              <img src={assets.setting_icon} alt="Settings Icon" />
              <p className="item-link">How To Use</p>
              <span className="tooltip">Understand use of the platform</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
