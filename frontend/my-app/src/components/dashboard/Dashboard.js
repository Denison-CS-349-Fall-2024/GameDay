import React from 'react';
import { useContext, useState, useEffect } from 'react';
import NotiPreview from '../notification_preview/noti_preview'; // Updated to PascalCase
import StandingPreview from '../standings_preview/standings_preview'; // Updated to PascalCase
import ScheduleSwitcher  from '../schedule_switcher/schedule_switcher'; 
import SchedulePage from '../schedule/schedule'; 
import { ScheduleContext, ScheduleProvider } from '../scheduleContext/scheduleContext';

import './Dashboard.css';

const DashboardComponent = () => {
  const { schedule, setSchedule } = useContext(ScheduleContext);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false); // New state to track if data has been fetched

  // const backend_host = "http://54.198.164.179:5000"
  const backend_host = "http://127.0.0.1:5000"

  const handleCreateSchedule = async () => {
    // Check if the schedule already has data
    if (schedule.length > 0) {
      alert("Schedule already exists!");
      return; // Exit early if schedule is not empty
    }

    setLoading(true);
    try {
      const response = await fetch(backend_host + '/create-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);

        // Fetch the updated schedule from the backend
        const scheduleResponse = await fetch(backend_host + '/get-schedule');
        
        if (scheduleResponse.ok) {
          const updatedSchedule = await scheduleResponse.json();
          // console.log('Updated Schedule:', updatedSchedule); // Debugging log
          
          // Check if the updatedSchedule is an array and not empty
          if (Array.isArray(updatedSchedule) && updatedSchedule.length > 0) {
            setSchedule(updatedSchedule); // Update the schedule state
            // console.log("Updated schedule: ", updatedSchedule)
            // alert("Set schedule successfully.");

          } else {
            alert('The schedule data is empty or in an incorrect format.');
          }

        } else {
          alert('Failed to load the updated schedule.');
        }

      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error:', error); // Log the error for debugging
      alert('Failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Trigger to fetch the schedule when Dashboard mounts
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


  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Commissioner Dashboard</h1>
        <nav>
          <ul>
            <li onClick={handleCreateSchedule}> {loading ? "Creating..." : "Create Schedule"} </li>
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
            {/* <ScheduleSwitcher/> */}
            <SchedulePage readOnly={false} /> 
          </div>


        </section>
      </main>
    </div>
  );
};

export default DashboardComponent;
