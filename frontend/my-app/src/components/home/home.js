// src/components/home/home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const HomeScreen = () => {
  const navigate = useNavigate();

  const handleNotificationsClick = () => {
    navigate('/notifications');
  };

  const handleStandingsClick = () => {
    navigate('/standings');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="home-container">
      {/* Top header with Login and Sign Up buttons */}
      <div className="top-header">
        <h1>GameDay</h1>
        <div className="top-buttons">
          <button className="header-button" onClick={handleLogin}>Login</button>
          <button className="header-button" onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>

      {/* Main header hub */}
      <div className="header">
        <button className="header-button" onClick={handleNotificationsClick}>Notifications</button>
        <button className="header-button" onClick={handleStandingsClick}>Standings</button>
      </div>

      {/* Calendar container */}
      <div className="calendar-container">
        <h2>Calendar</h2>
        {/* Placeholder for Calendar */}
        <div className="calendar-box">
          <p>Calendar Display.</p>
        </div>
      </div>

      {/* Footer with Contact Us and Meet the Team buttons */}
      <div className="footer">
        <button className="footer-button">Contact Us</button>
        <button className="footer-button">Meet the Team</button>
      </div>
    </div>
  );
};

export default HomeScreen;
