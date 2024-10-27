import React from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate to announcement page
import './noti_preview.css';

const Noti_preview = () => {
  const navigate = useNavigate();
  
  const notifications = [
    "New game announced!",
    "Team mini-black from Watkins Memorial won the last match.",
    "Maintenance on October 24.",
    "New rules announced.",
    "Commissioner meeting on October 30."
  ]; // Mock data

  return (
    <div className="component-square">
      <h3>Notifications</h3>
      <ul>
        {notifications.slice(0, 5).map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/notifications')}>View All Announcements</button>
    </div>
  );
};

export default Noti_preview;
