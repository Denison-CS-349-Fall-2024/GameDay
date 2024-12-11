// src/components/login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
// import loginInfo from '../../data/loginInfo.json'; // Read the JSON file for stored login info

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!username || !password) {
      alert('Please fill in both username and password.');
      return;
    } 
    // const backend_host = "http://54.198.164.179:5000"
    const backend_host = "http://50.19.159.206:5000"
    //const backend_host = "http://127.0.0.1:5000"
    // Send request to backend to check login info
    try {
      const response = await fetch(backend_host + '/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message)
        navigate('/dashboard'); // Redirect to dashboard on success
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again. Error: ' + error);
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <div className="additional-links">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/signup">Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;

