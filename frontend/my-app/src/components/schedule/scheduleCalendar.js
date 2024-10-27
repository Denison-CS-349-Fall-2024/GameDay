// ScheduleCalendar.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './scheduleCalendar.css';

const localizer = momentLocalizer(moment);

const events = [
  { title: 'Team A vs Team B', start: new Date(2024, 9, 28, 10, 0), end: new Date(2024, 9, 28, 12, 0) },
  { title: 'Team E vs Team F', start: new Date(2024, 9, 28, 14, 0), end: new Date(2024, 9, 28, 16, 0) },
  { title: 'Team I vs Team J', start: new Date(2024, 9, 28, 18, 0), end: new Date(2024, 9, 28, 20, 0) },
  { title: 'Team A vs Team C', start: new Date(2024, 9, 29, 9, 0), end: new Date(2024, 9, 29, 11, 0) },
  { title: 'Team C vs Team D', start: new Date(2024, 9, 29, 14, 0), end: new Date(2024, 9, 29, 16, 0) },
  { title: 'Team I vs Team J', start: new Date(2024, 9, 29, 15, 0), end: new Date(2024, 9, 29, 19, 0) },
  { title: 'Team M vs Team N', start: new Date(2024, 9, 30, 10, 0), end: new Date(2024, 9, 30, 12, 0) },
  { title: 'Team C vs Team M', start: new Date(2024, 9, 30, 15, 0), end: new Date(2024, 9, 30, 17, 0) },
  { title: 'Team I vs Team F', start: new Date(2024, 9, 30, 18, 0), end: new Date(2024, 9, 30, 20, 0) },
];

const ScheduleCalendar = () => (
    <div className="calendar-wrapper">
        <h3 className="calendar-title">Team Schedule</h3>
        <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '60vh', width: '100%' }}
        views={['month', 'week', 'day']}
        defaultView="week"
        />
    <div className="export-button">
      <button>Export Schedule</button>
    </div>
    </div>
);

export default ScheduleCalendar;
