import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import NotiPreview from '../notification_preview/noti_preview';
import StandingPreview from '../standings_preview/standings_preview';
import SchedulePage from '../schedule/schedule';
import { ScheduleContext } from '../scheduleContext/scheduleContext';
import './Dashboard.css';
import axios from "axios";

const DashboardComponent = () => {
  const { schedule, setSchedule } = useContext(ScheduleContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  const [announcementText, setAnnouncementText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const backend_host = 'http://50.19.159.206:5000';
  // const backend_host = "http://127.0.0.1:5000"

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

  const handleMakeAnnouncement = async () => {
    if (!announcementText.trim()) {
      alert("Announcement text cannot be empty!");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${backend_host}/save-announcements`, {
        text: announcementText,
      });
      alert(response.data.message || "Announcement created successfully!");
      setAnnouncementText(""); // Clear the input field
    } catch (error) {
      alert(
        error.response?.data?.error ||
          "An error occurred while creating the announcement."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dashboard">
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

      <main>
        <section>
          <h2>Welcome, Commissioner!</h2>
          <p>Here, you can input and view schedule data.</p>
        </section>

        <div className="schedule-switcher">
          <SchedulePage readOnly={false} allowImport={true} />
        </div>
      </main>

      <footer className="dashboard-footer">
        <button className="footer-button">Contact Us</button>
        <button className="footer-button">Meet the Team</button>
      </footer>

      {/* Modal */}
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


