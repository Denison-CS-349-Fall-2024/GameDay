import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotiPreview from '../notification_preview/noti_preview';
import StandingPreview from '../standings_preview/standings_preview';
import SchedulePage from '../schedule/schedule';
import { ScheduleContext } from '../scheduleContext/scheduleContext';
import './Dashboard.css';
import axios from "axios";

const DashboardComponent = () => {
  const { schedule, setSchedule } = useContext(ScheduleContext); // Context for schedule data
  const [loading, setLoading] = useState(false); // State to track loading for schedule creation
  const navigate = useNavigate(); // Navigation handler
  const [announcementText, setAnnouncementText] = useState(""); // Announcement input
  const [isSubmitting, setIsSubmitting] = useState(false); // State for announcement submission
  const [showModal, setShowModal] = useState(false); // State to toggle modal visibility

  const backend_host = 'http://50.19.159.206:5000'; // Backend API URL
  // Uncomment the next line for local testing
  // const backend_host = "http://127.0.0.1:5000";

  // Creates a schedule by sending a POST request to the backend
  const handleCreateSchedule = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backend_host}/create-schedule`, { method: 'POST' });
      if (response.ok) {
        alert('Schedule created successfully!');
        const scheduleResponse = await fetch(`${backend_host}/get-schedule`);
        if (scheduleResponse.ok) {
          const updatedSchedule = await scheduleResponse.json();
          setSchedule(updatedSchedule); // Update schedule in context
        }
      } else {
        alert('Error creating schedule.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create schedule.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Logs out the user and redirects to the homepage
  const handleLogout = () => {
    navigate('/'); // Navigate to home
  };

  // Fetches the schedule from the backend when the component mounts
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(`${backend_host}/get-schedule`);
        if (response.ok) {
          const updatedSchedule = await response.json();
          setSchedule(updatedSchedule); // Update schedule in context
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };
    fetchSchedule();
  }, [setSchedule]);

  // Submits an announcement to the backend
  const handleMakeAnnouncement = async () => {
    if (!announcementText.trim()) {
      alert("Announcement text cannot be empty!");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${backend_host}/save-announcements`, {
        text: announcementText, // Announcement content
      });
      alert(response.data.message || "Announcement created successfully!");
      setAnnouncementText(""); // Clear the input field
    } catch (error) {
      alert(
        error.response?.data?.error ||
        "An error occurred while creating the announcement."
      );
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="dashboard">
      {/* Header with navigation */}
      <header className="dashboard-header">
        <h1>Commissioner Dashboard</h1>
        <nav>
          <ul>
            <li onClick={handleCreateSchedule}>{loading ? 'Creating...' : 'Create Schedule'}</li>
            <li onClick={() => setShowModal(true)}>Make Announcement</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <main>
        <section>
          <h2>Welcome, Commissioner!</h2>
          <p>Here, you can input and view schedule data.</p>
        </section>

        <div className="schedule-switcher">
          <SchedulePage readOnly={false} allowImport={true} />
        </div>
      </main>

      {/* Footer with static buttons */}
      <footer className="dashboard-footer">
        <button className="footer-button">Contact Us</button>
        <button className="footer-button">Meet the Team</button>
      </footer>

      {/* Announcement Modal */}
      {showModal && (
        <div className="announcement-modal">
          <div className="modal-content">
            <textarea
              className="announcement-textarea"
              placeholder="Enter announcement text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
            />
            <div className="modal-buttons">
              <button
                className="cancel-button"
                onClick={() => {
                  setShowModal(false); // Close modal
                  setAnnouncementText(""); // Clear input
                }}
              >
                Cancel
              </button>
              <button
                className="submit-button"
                onClick={() => {
                  handleMakeAnnouncement();
                  setShowModal(false); // Close modal after submit
                  setAnnouncementText(""); // Clear input
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardComponent;



