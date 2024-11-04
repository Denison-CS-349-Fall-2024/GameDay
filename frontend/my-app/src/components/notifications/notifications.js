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
    <div className="notifications-container">
      <h2>Notifications</h2>
      <p>Here are your latest notifications.</p>

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

      <div className="footer">
        <p>Powered by Your Company</p>
      </div>
    </div>
  );
};

export default Notifications;

