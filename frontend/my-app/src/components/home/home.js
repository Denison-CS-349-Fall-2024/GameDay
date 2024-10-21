// src/components/home/home.js
import React from 'react';
import './home.css';

const HomeScreen = () => {
  return (
    <div className="home-container">
      <div className="header">
        <button className="header-button">Notifications</button>
        <button className="header-button">Standings</button>
      </div>
      <div className="calendar-container">
        <h2>Calendar</h2>
        {/* Placeholder for Calendar */}
        <div className="calendar-box">
          <p>Calendar Display.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
