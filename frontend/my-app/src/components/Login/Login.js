// src/components/login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import loginInfo from './loginInfo.json'; // Read the JSON file for stored login info

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

    // Example of calling a file that store login info
    if (username in loginInfo && password == loginInfo[username].password) {
      alert('Login successful!');
      navigate('/dashboard'); // Redirect to dashboard on success
    } else {
      alert('Login failed, please check your credentials.');
    }

    // Example API call for authentication
    // try {
    //   const response = await fetch('http://localhost:5000/api/users/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password })
    //   });

    //   if (response.ok) {
    //     alert('Login successful!');
    //     navigate('/dashboard'); // Redirect to dashboard on success
    //   } else {
    //     alert('Login failed, please check your credentials.');
    //   }
    // } catch (error) {
    //   console.error('Error during login:', error);
    //   alert('An error occurred. Please try again later.');
    // }
  };

  return (
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
  );
};

export default Login;

