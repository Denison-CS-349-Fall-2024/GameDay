import React, { useContext, useState, useEffect } from 'react';
import NotiPreview from '../notification_preview/noti_preview'; // Updated to PascalCase
import StandingPreview from '../standings_preview/standings_preview'; // Updated to PascalCase
import ScheduleSwitcher from '../schedule_switcher/schedule_switcher';
import SchedulePage from '../schedule/schedule';
import { ScheduleContext } from '../scheduleContext/scheduleContext';

import './Dashboard.css';

const DashboardComponent = () => {
  const { schedule, setSchedule } = useContext(ScheduleContext);
  const [loading, setLoading] = useState(false);

  const backend_host = 'http://127.0.0.1:5000';

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
      {/* Header */}
      <header className="dashboard-header">
        <h1>Commissioner Dashboard</h1>
        <nav>
          <ul>
            <li onClick={handleCreateSchedule}>{loading ? 'Creating...' : 'Create Schedule'}</li>
            <li>Input Schedule</li>
            <li>Logout</li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <section>
          <h2>Welcome, Commissioner!</h2>
          <p>Here, you can input and view schedule data.</p>
        </section>

        <section className="dashboard-components">
          <div>
            <NotiPreview />
          </div>
          <div>
            <StandingPreview />
          </div>
        </section>

        <div className="schedule-switcher">
          <SchedulePage readOnly={false} />
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <button className="footer-button">Contact Us</button>
        <button className="footer-button">Meet the Team</button>
      </footer>
    </div>
  );
};

export default DashboardComponent;

