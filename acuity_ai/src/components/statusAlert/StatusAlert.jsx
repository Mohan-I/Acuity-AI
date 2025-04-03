import { useState, useEffect } from "react";
import { assets } from "../../assets/icons/assets";
import "./statusAlert.css";

const StatusAlert = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const handleStatusChange = (status) => {
      setIsOnline(status);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    };

    const handleOnline = () => handleStatusChange(true);
    const handleOffline = () => handleStatusChange(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showAlert) return null;

  return (
    <div className={`status-alert ${isOnline ? "online" : "offline"} show`}>
      <img
        src={isOnline ? assets.online_icon : assets.offline_icon}
        alt={isOnline ? "Online" : "Offline"}
      />
      <p>{isOnline ? "You're back online" : "You're offline. Check your connection"}</p>
      <button onClick={() => setShowAlert(false)} className="close_btn">
        <img src={assets.close_icon} alt="Close" />
      </button>
    </div>
  );
};

export default StatusAlert;
