import './notifications.css';
import React, { useEffect, useState } from 'react';

const NotificationPage = () => {
  const [announcements, setAnnouncements] = useState([]);

  const backend_host = "http://50.19.159.206:5000";
  // Fetch announcements from the backend
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(`${backend_host}/get-announcements`); 
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };
    console.log('Announcements state:', announcements);
    fetchAnnouncements();
  }, []);

  return (
    <div className="notification-page">
      <h1>Announcements</h1>
        <div className="announcements-container">
          {announcements.length === 0 ? (
            <p>No announcements available.</p>
          ) : (
            announcements
              .slice()
              .map((announcement, index) => (
                <div key={index} className="announcement-card">
                  <p className="announcement-text">{announcement.text}</p>
                  <p className="announcement-timestamp">
                    Posted on: {new Date(announcement.timestamp).toLocaleString()}
                  </p>
                </div>
              ))
          )}
        </div>
    </div>
  );
};

export default NotificationPage;