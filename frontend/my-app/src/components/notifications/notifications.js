// src/components/notifications/Notifications.js
import React, { useState } from 'react';
import './notifications.css';

const Notifications = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="top-header">
        <h1>GameDay</h1>
        <div className="top-buttons">
          <button className="header-button">Login</button>
          <button className="header-button">Sign Up</button>
        </div>
      </div>

      {/* Notifications Content */}
      <div className="notifications-wrapper">
        <div className="notifications-container">
          <h2>Notifications</h2>


          <div className="chat-log-container">
            <div className="chat-window">
              {messages.map((msg, index) => (
                <div key={index} className="message">
                  {msg}
                </div>
              ))}
            </div>

            <div className="notification-log">
              <h3>Notification Log</h3>
              {messages.length === 0 ? (
                <p>No notifications yet.</p>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className="log-message">
                    {msg}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="input-container">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="message-input"
            />
            <button onClick={handleSend} className="send-button">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <button className="footer-button">Contact Us</button>
        <button className="footer-button">Meet the Team</button>
      </div>
    </div>
  );
};

export default Notifications;


