// src/components/dashboard/Dashboard.js
import React from 'react';
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
          {/* Future: Add components for viewing and inputting schedule */}
        </section>
      </main>
    </div>
  );
};

export default DashboardComponent;
