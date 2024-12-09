import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import NotiPreview from '../notification_preview/noti_preview';
import StandingPreview from '../standings_preview/standings_preview';
import SchedulePage from '../schedule/schedule';
import { ScheduleContext } from '../scheduleContext/scheduleContext';
import './Dashboard.css';

const DashboardComponent = () => {
  const { schedule, setSchedule } = useContext(ScheduleContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const backend_host = 'http://50.19.159.206:5000';

  const handleCreateSchedule = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backend_host}/create-schedule`, { method: 'POST' });
      if (response.ok) {
        alert('Schedule created successfully!');
        const scheduleResponse = await fetch(`${backend_host}/get-schedule`);
        if (scheduleResponse.ok) {
          const updatedSchedule = await scheduleResponse.json();
          setSchedule(updatedSchedule);
        }
      } else {
        alert('Error creating schedule.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create schedule.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Any logout-related logic (e.g., clearing tokens) can go here
    navigate('/'); // Redirect to the homepage
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(`${backend_host}/get-schedule`);
        if (response.ok) {
          const updatedSchedule = await response.json();
          setSchedule(updatedSchedule);
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };
    fetchSchedule();
  }, [setSchedule]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Commissioner Dashboard</h1>
        <nav>
          <ul>
            <li onClick={handleCreateSchedule}>{loading ? 'Creating...' : 'Create Schedule'}</li>
            <li>Input Schedule</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </nav>
      </header>

      <main>
        <section>
          <h2>Welcome, Commissioner!</h2>
          <p>Here, you can input and view schedule data.</p>
        </section>

        <div className="schedule-switcher">
          <SchedulePage readOnly={false} />
        </div>
      </main>

      <footer className="dashboard-footer">
        <button className="footer-button">Contact Us</button>
        <button className="footer-button">Meet the Team</button>
      </footer>
    </div>
  );
};

export default DashboardComponent;


