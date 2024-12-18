// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/Login/Login';
import SignUpPage from './pages/signup/SignUp';
import ForgotPasswordPage from './pages/forgotpassword/ForgotPassword';
import DashboardPage from './pages/dashboard/Dashboard';
import HomeScreen from './components/home/home';
import Notifications from './components/notifications/notifications';
import Standings from './components/standings/standings';
import { ScheduleProvider } from './components/scheduleContext/scheduleContext';

const App = () => {
  return (
    <ScheduleProvider> {}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/standings" element={<Standings />} />
        </Routes>
      </Router>
    </ScheduleProvider>
  );
};

export default App;

