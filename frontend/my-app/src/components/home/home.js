// src/components/home/home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleCalendar from '../schedule/scheduleCalendar';
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
    <div>
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
      </div>
      
      <div className='calendar-box'>
        <ScheduleCalendar />
      </div>
      
      <div className="footer">
        <button className="footer-button">Contact Us</button>
        <button className="footer-button">Meet the Team</button>
      </div>
    </div>
      
  );
};

export default HomeScreen;
