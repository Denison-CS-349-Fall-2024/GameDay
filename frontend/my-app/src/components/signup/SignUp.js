// src/components/signup/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
// import loginInfo from '../../data/loginInfo.json'; // Read the JSON file for stored login info

const SignUpComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Send request to backend to check username info, if okay then store new information
    try {
      const response = await fetch('http:/54.198.164.179:5000/api/signup', {
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
    <form className="signup-form" onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
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
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button type="submit">Create Account</button>
      <div className="additional-links">
        <a href="/login">Already have an account? Login</a>
      </div>
    </form>
  );
};

export default SignUpComponent;
