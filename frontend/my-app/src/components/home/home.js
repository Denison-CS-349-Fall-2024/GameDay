// src/components/home/home.js
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleSwitcher  from '../schedule_switcher/schedule_switcher'; 
import './home.css';
import SchedulePage from '../schedule/schedule'; 
import { ScheduleContext, ScheduleProvider } from '../scheduleContext/scheduleContext';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { schedule, setSchedule } = useContext(ScheduleContext); // Access setSchedule
  const [hasFetched, setHasFetched] = useState(false); // New state to track if data has been fetched
  const backend_host = "http://50.19.159.206:5000"; // Update as needed

  // Trigger to fetch the schedule when HomeScreen mounts
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(`${backend_host}/get-schedule`);
        if (response.ok) {
          const updatedSchedule = await response.json();
          if (updatedSchedule.length > 0) {
            setSchedule(updatedSchedule); // Update the schedule state
          } else {
            console.warn('Fetched schedule is empty.');
          }
        } else {
          console.error('Failed to fetch the schedule.');
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    // Only fetch if the schedule is empty
    if (!hasFetched && schedule.length === 0) {
      fetchSchedule();
    }
  }, [hasFetched, schedule, setSchedule]);

  // Log to check if the schedule is available
  useEffect(() => {
    console.log('Schedule in HomeScreen:', schedule); // Debugging log
  }, [schedule]);

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


      <div className="schedule-switcher">
        {/* <ScheduleSwitcher/>  */}
        <SchedulePage readOnly={true} />
        
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

