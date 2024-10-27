// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/Login/Login';
import SignUpPage from './pages/signup/SignUp';
import ForgotPasswordPage from './pages/forgotpassword/ForgotPassword';
import DashboardPage from './pages/dashboard/Dashboard';
import HomeScreen from './components/home/home';
import Notifications from './components/notifications/notifications';
import Standings from './components/standings/standings'; // Import Standings component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/standings" element={<Standings />} /> {/* Lowercase route for Standings */}
      </Routes>
    </Router>
  );
};

export default App;

