

// scheduleCalendar.2js

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './scheduleCalendar2.css';

const localizer = momentLocalizer(moment);

const events_gym_2 = [
  { title: 'Midi: Watkins Memorial Team3 vs Heath Team2', start: new Date(2024, 8, 1, 16, 0), end: new Date(2024, 8, 1, 18, 0) },
  { title: 'Midi: Lakewood Team1 vs Johnstown Team4', start: new Date(2024, 8, 2, 16, 0), end: new Date(2024, 8, 2, 18, 0) },
  { title: 'Junior: Licking Heights Team1 vs Heath Team2', start: new Date(2024, 8, 3, 16, 0), end: new Date(2024, 8, 3, 18, 0) },
  { title: 'Junior: Licking Heights Team3 vs Lakewood Team1', start: new Date(2024, 8, 4, 16, 0), end: new Date(2024, 8, 4, 18, 0) },
  { title: 'Senior: Licking Heights Team2 vs Heath Team4', start: new Date(2024, 8, 5, 16, 0), end: new Date(2024, 8, 5, 18, 0) },
  { title: 'Senior: Licking Heights Team3 vs Utica Team3', start: new Date(2024, 8, 6, 16, 0), end: new Date(2024, 8, 6, 18, 0) },
  { title: 'Midi: Watkins Memorial Team1 vs Heath Team2', start: new Date(2024, 8, 8, 16, 0), end: new Date(2024, 8, 8, 18, 0) },
  { title: 'Midi: Utica Team2 vs Heath Team1', start: new Date(2024, 8, 9, 16, 0), end: new Date(2024, 8, 9, 18, 0) },
  { title: 'Junior: Heath Team3 vs Johnstown Team4', start: new Date(2024, 8, 10, 16, 0), end: new Date(2024, 8, 10, 18, 0) },
  { title: 'Junior: Licking Heights Team1 vs Utica Team1', start: new Date(2024, 8, 11, 16, 0), end: new Date(2024, 8, 11, 18, 0) },
  { title: 'Senior: Heath Team3 vs Johnstown Team1', start: new Date(2024, 8, 12, 16, 0), end: new Date(2024, 8, 12, 18, 0) },
  { title: 'Senior: Watkins Memorial Team4 vs Licking Heights Team2', start: new Date(2024, 8, 13, 16, 0), end: new Date(2024, 8, 13, 18, 0) },
  { title: 'Midi: Watkins Memorial Team1 vs Licking Heights Team1', start: new Date(2024, 8, 15, 16, 0), end: new Date(2024, 8, 15, 18, 0) },
  { title: 'Midi: Licking Heights Team2 vs Utica Team1', start: new Date(2024, 8, 16, 16, 0), end: new Date(2024, 8, 16, 18, 0) },
  { title: 'Junior: Watkins Memorial Team2 vs Utica Team4', start: new Date(2024, 8, 17, 16, 0), end: new Date(2024, 8, 17, 18, 0) },
  { title: 'Junior: Watkins Memorial Team4 vs Utica Team1', start: new Date(2024, 8, 18, 16, 0), end: new Date(2024, 8, 18, 18, 0) },
  { title: 'Senior: Heath Team1 vs Johnstown Team4', start: new Date(2024, 8, 19, 16, 0), end: new Date(2024, 8, 19, 18, 0) },
  { title: 'Senior: Lakewood Team3 vs Heath Team4', start: new Date(2024, 8, 20, 16, 0), end: new Date(2024, 8, 20, 18, 0) },
  { title: 'Midi: Watkins Memorial Team3 vs Licking Heights Team1', start: new Date(2024, 8, 22, 16, 0), end: new Date(2024, 8, 22, 18, 0) },
  { title: 'Midi: Watkins Memorial Team4 vs Licking Heights Team2', start: new Date(2024, 8, 23, 16, 0), end: new Date(2024, 8, 23, 18, 0) },
  { title: 'Junior: Watkins Memorial Team3 vs Heath Team4', start: new Date(2024, 8, 24, 16, 0), end: new Date(2024, 8, 24, 18, 0) },
  { title: 'Senior: Heath Team2 vs Johnstown Team4', start: new Date(2024, 8, 25, 16, 0), end: new Date(2024, 8, 25, 18, 0) },
  { title: 'Senior: Watkins Memorial Team3 vs Lakewood Team2', start: new Date(2024, 8, 26, 16, 0), end: new Date(2024, 8, 26, 18, 0) },
  { title: 'Midi: Lakewood Team4 vs Johnstown Team1', start: new Date(2024, 8, 29, 16, 0), end: new Date(2024, 8, 29, 18, 0) },
  { title: 'Midi: Watkins Memorial Team4 vs Heath Team1', start: new Date(2024, 8, 30, 16, 0), end: new Date(2024, 8, 30, 18, 0) },
  { title: 'Junior: Watkins Memorial Team1 vs Utica Team4', start: new Date(2024, 9, 1, 16, 0), end: new Date(2024, 9, 1, 18, 0) },
  { title: 'Junior: Utica Team2 vs Heath Team4', start: new Date(2024, 9, 2, 16, 0), end: new Date(2024, 9, 2, 18, 0) },
  { title: 'Senior: Licking Heights Team3 vs Johnstown Team4', start: new Date(2024, 9, 3, 16, 0), end: new Date(2024, 9, 3, 18, 0) },
  { title: 'Senior: Lakewood Team2 vs Heath Team4', start: new Date(2024, 9, 4, 16, 0), end: new Date(2024, 9, 4, 18, 0) },
  { title: 'Midi: Licking Heights Team4 vs Utica Team2', start: new Date(2024, 9, 6, 16, 0), end: new Date(2024, 9, 6, 18, 0) },
  { title: 'Midi: Heath Team4 vs Johnstown Team2', start: new Date(2024, 9, 7, 16, 0), end: new Date(2024, 9, 7, 18, 0) },
  { title: 'Junior: Watkins Memorial Team1 vs Licking Heights Team4', start: new Date(2024, 9, 8, 16, 0), end: new Date(2024, 9, 8, 18, 0) },
  { title: 'Junior: Lakewood Team2 vs Utica Team2', start: new Date(2024, 9, 9, 16, 0), end: new Date(2024, 9, 9, 18, 0) },
  { title: 'Senior: Lakewood Team3 vs Johnstown Team3', start: new Date(2024, 9, 10, 16, 0), end: new Date(2024, 9, 10, 18, 0) },
  { title: 'Senior: Watkins Memorial Team2 vs Utica Team4', start: new Date(2024, 9, 11, 16, 0), end: new Date(2024, 9, 11, 18, 0) },
  { title: 'Midi: Licking Heights Team3 vs Utica Team2', start: new Date(2024, 9, 13, 16, 0), end: new Date(2024, 9, 13, 18, 0) },
  { title: 'Midi: Watkins Memorial Team1 vs Heath Team3', start: new Date(2024, 9, 14, 16, 0), end: new Date(2024, 9, 14, 18, 0) },
  { title: 'Junior: Watkins Memorial Team1 vs Utica Team2', start: new Date(2024, 9, 15, 16, 0), end: new Date(2024, 9, 15, 18, 0) },
  { title: 'Junior: Utica Team3 vs Johnstown Team3', start: new Date(2024, 9, 16, 16, 0), end: new Date(2024, 9, 16, 18, 0) },
  { title: 'Senior: Watkins Memorial Team2 vs Utica Team3', start: new Date(2024, 9, 17, 16, 0), end: new Date(2024, 9, 17, 18, 0) },
  { title: 'Senior: Utica Team2 vs Heath Team4', start: new Date(2024, 9, 18, 16, 0), end: new Date(2024, 9, 18, 18, 0) },
  { title: 'Midi: Utica Team2 vs Johnstown Team4', start: new Date(2024, 9, 20, 16, 0), end: new Date(2024, 9, 20, 18, 0) },
  { title: 'Midi: Licking Heights Team4 vs Lakewood Team3', start: new Date(2024, 9, 21, 16, 0), end: new Date(2024, 9, 21, 18, 0) },
  { title: 'Junior: Licking Heights Team4 vs Utica Team4', start: new Date(2024, 9, 22, 16, 0), end: new Date(2024, 9, 22, 18, 0) },
  { title: 'Junior: Utica Team2 vs Johnstown Team4', start: new Date(2024, 9, 23, 16, 0), end: new Date(2024, 9, 23, 18, 0) },
  { title: 'Senior: Watkins Memorial Team2 vs Licking Heights Team4', start: new Date(2024, 9, 24, 16, 0), end: new Date(2024, 9, 24, 18, 0) },
  { title: 'Senior: Watkins Memorial Team3 vs Utica Team2', start: new Date(2024, 9, 25, 16, 0), end: new Date(2024, 9, 25, 18, 0) }
];

const ScheduleCalendar2 = () => (
  <div className="calendar-wrapper">
    <h3 className="calendar-title">Team Schedule</h3>
    <Calendar
      localizer={localizer}
      events={events_gym_2}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '70vh', width: '100%' }} // Full width of the wrapper, fixed height
      views={['month', 'week', 'day']}
      defaultView="month"
    />
    <div className="export-button">
      <button>Export Schedule</button>
    </div>
  </div>
);

export default ScheduleCalendar2;
