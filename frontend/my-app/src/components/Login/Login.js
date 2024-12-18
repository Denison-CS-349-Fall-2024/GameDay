import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState(''); // State for username input
  const [password, setPassword] = useState(''); // State for password input
  const navigate = useNavigate(); // Hook for navigation

  // Handles login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Validate inputs
    if (!username || !password) {
      alert('Please fill in both username and password.');
      return;
    }

    const backend_host = "http://50.19.159.206:5000"; // Backend API URL

    // Send login data to the backend
    try {
      const response = await fetch(`${backend_host}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json(); // Parse response

      if (response.ok) {
        alert(data.message); // Display success message
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        alert(data.message); // Display error message from the server
      }
    } catch (error) {
      console.error('Error:', error); // Log error to console
      alert('An error occurred. Please try again. Error: ' + error); // Show user-friendly error
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleLogin}>
        {/* Username Input */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Login</button>

        {/* Additional Links */}
        <div className="additional-links">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/signup">Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;


