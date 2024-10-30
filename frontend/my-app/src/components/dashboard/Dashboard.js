import React from 'react';
import NotiPreview from '../notification_preview/noti_preview'; // Updated to PascalCase
import StandingPreview from '../standings_preview/standings_preview'; // Updated to PascalCase
import ScheduleSwitcher  from '../schedule_switcher/schedule_switcher'; 

import './Dashboard.css';

const DashboardComponent = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Commissioner Dashboard</h1>
        <nav>
          <ul>
            <li>View Schedule</li>
            <li>Input Schedule</li>
            <li>Logout</li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h2>Welcome, Commissioner!</h2>
          <p>Here, you can input and view schedule data.</p>
        </section>
        <section>
          <div className='dashboard-components'>
            <NotiPreview />  {/* Use the updated PascalCase component */}
            <StandingPreview />  {/* Use the updated PascalCase component */}
          </div>

          <div className="schedule-switcher">
            <ScheduleSwitcher/> 
          </div>


        </section>
      </main>
    </div>
  );
};

export default DashboardComponent;
