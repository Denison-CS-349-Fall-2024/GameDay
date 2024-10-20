// src/components/forgotpassword/ForgotPassword.js
import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    // Handle forgot password logic (e.g., send reset link to backend)
    console.log(`Password reset request for: ${email}`);
  };

  return (
    <form className="forgot-password-form" onSubmit={handleForgotPassword}>
      <h2>Forgot Password</h2>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ForgotPasswordComponent;
