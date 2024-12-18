import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleSwitcher from '../schedule_switcher/schedule_switcher'; 
import './home.css';
import SchedulePage from '../schedule/schedule'; 
import { ScheduleContext, ScheduleProvider } from '../scheduleContext/scheduleContext';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { schedule, setSchedule } = useContext(ScheduleContext); // Access schedule context
  const [hasFetched, setHasFetched] = useState(false); // Track if schedule data has been fetched
  const backend_host = "http://50.19.159.206:5000"; // Backend API URL

  // Fetch schedule data when the component mounts
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(`${backend_host}/get-schedule`);
        if (response.ok) {
          const updatedSchedule = await response.json();
          if (updatedSchedule.length > 0) {
            setSchedule(updatedSchedule); // Update schedule state
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

    // Only fetch if not already fetched and schedule is empty
    if (!hasFetched && schedule.length === 0) {
      fetchSchedule();
      setHasFetched(true); // Mark as fetched
    }
  }, [hasFetched, schedule, setSchedule]);

  // Debugging log to monitor schedule changes
  useEffect(() => {
    console.log('Schedule in HomeScreen:', schedule);
  }, [schedule]);

  // Navigation handlers
  const handleNotificationsClick = () => navigate('/notifications');
  const handleStandingsClick = () => navigate('/standings');
  const handleLogin = () => navigate('/login');
  const handleSignUp = () => navigate('/signup');

  return (
    <div className="home-container">
      {/* Top header with Login and Sign Up */}
      <div className="top-header">
        <h1>GameDay</h1>
        <div className="top-buttons">
          <button className="header-button" onClick={handleLogin}>Login</button>
          <button className="header-button" onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>

      {/* Main header with navigation */}
      <div className="header">
        <button className="header-button" onClick={handleNotificationsClick}>Notifications</button>
        <button className="header-button" onClick={handleStandingsClick}>Standings</button>
      </div>

      {/* Schedule section */}
      <div className="schedule-switcher">
        <SchedulePage readOnly={true} allowImport={false} />
      </div>

      {/* Footer */}
      <div className="footer">
        <button className="footer-button">Contact Us</button>
        <button className="footer-button">Meet the Team</button>
      </div>
    </div>
  );
};

export default HomeScreen;

