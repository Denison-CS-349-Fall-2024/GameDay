// ScheduleCalendar.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './scheduleCalendar.css';

const localizer = momentLocalizer(moment);

const events = [
  { title: 'Midi - Licking Heights Team1 vs Lakewood Team2', start: new Date(2024, 10, 19, 16, 0), end: new Date(2024, 10, 19, 18, 0) },
  { title: 'Midi - Lakewood Team3 vs Utica Team1', start: new Date(2024, 10, 20, 16, 0), end: new Date(2024, 10, 20, 18, 0) },
  { title: 'Junior - Watkins Memorial Team3 vs Heath Team3', start: new Date(2024, 10, 21, 16, 0), end: new Date(2024, 10, 21, 18, 0) },
  { title: 'Junior - Heath Team1 vs Johnstown Team3', start: new Date(2024, 10, 22, 16, 0), end: new Date(2024, 10, 22, 18, 0) },
  { title: 'Senior - Utica Team1 vs Johnstown Team3', start: new Date(2024, 10, 23, 16, 0), end: new Date(2024, 10, 23, 18, 0) },
  { title: 'Senior - Lakewood Team2 vs Johnstown Team4', start: new Date(2024, 10, 24, 16, 0), end: new Date(2024, 10, 24, 18, 0) },
  { title: 'Midi - Utica Team2 vs Johnstown Team3', start: new Date(2024, 10, 12, 16, 0), end: new Date(2024, 10, 12, 18, 0) },
  { title: 'Midi - Lakewood Team4 vs Utica Team4', start: new Date(2024, 10, 13, 16, 0), end: new Date(2024, 10, 13, 18, 0) },
  { title: 'Junior - Licking Heights Team3 vs Heath Team2', start: new Date(2024, 10, 14, 16, 0), end: new Date(2024, 10, 14, 18, 0) },
  { title: 'Senior - Watkins Memorial Team4 vs Heath Team3', start: new Date(2024, 10, 15, 16, 0), end: new Date(2024, 10, 15, 18, 0) },
  { title: 'Senior - Watkins Memorial Team3 vs Heath Team1', start: new Date(2024, 10, 16, 16, 0), end: new Date(2024, 10, 16, 18, 0) },
  { title: 'Midi - Licking Heights Team1 vs Johnstown Team3', start: new Date(2024, 10, 5, 16, 0), end: new Date(2024, 10, 5, 18, 0) },
  { title: 'Midi - Lakewood Team1 vs Heath Team3', start: new Date(2024, 10, 6, 16, 0), end: new Date(2024, 10, 6, 18, 0) },
  { title: 'Junior - Lakewood Team3 vs Johnstown Team1', start: new Date(2024, 10, 7, 16, 0), end: new Date(2024, 10, 7, 18, 0) },
  { title: 'Junior - Licking Heights Team2 vs Utica Team3', start: new Date(2024, 10, 8, 16, 0), end: new Date(2024, 10, 8, 18, 0) },
  { title: 'Senior - Watkins Memorial Team4 vs Utica Team3', start: new Date(2024, 10, 9, 16, 0), end: new Date(2024, 10, 9, 18, 0) },
  { title: 'Senior - Utica Team1 vs Heath Team2', start: new Date(2024, 10, 10, 16, 0), end: new Date(2024, 10, 10, 18, 0) },
  { title: 'Midi - Watkins Memorial Team2 vs Licking Heights Team2', start: new Date(2024, 9, 29, 16, 0), end: new Date(2024, 9, 29, 18, 0) },
  { title: 'Midi - Lakewood Team4 vs Heath Team1', start: new Date(2024, 9, 30, 16, 0), end: new Date(2024, 9, 30, 18, 0) },
  { title: 'Junior - Watkins Memorial Team3 vs Utica Team2', start: new Date(2024, 9, 31, 16, 0), end: new Date(2024, 9, 31, 18, 0) },
  { title: 'Junior - Watkins Memorial Team4 vs Licking Heights Team2', start: new Date(2024, 10, 1, 16, 0), end: new Date(2024, 10, 1, 18, 0) },
  { title: 'Senior - Licking Heights Team4 vs Utica Team3', start: new Date(2024, 10, 2, 16, 0), end: new Date(2024, 10, 2, 18, 0) },
  { title: 'Senior - Lakewood Team2 vs Johnstown Team1', start: new Date(2024, 10, 3, 16, 0), end: new Date(2024, 10, 3, 18, 0) },
  { title: 'Midi - Licking Heights Team2 vs Johnstown Team2', start: new Date(2024, 9, 22, 16, 0), end: new Date(2024, 9, 22, 18, 0) },
  { title: 'Midi - Licking Heights Team1 vs Utica Team3', start: new Date(2024, 9, 23, 16, 0), end: new Date(2024, 9, 23, 18, 0) },
  { title: 'Junior - Watkins Memorial Team3 vs Licking Heights Team4', start: new Date(2024, 9, 24, 16, 0), end: new Date(2024, 9, 24, 18, 0) },
  { title: 'Junior - Watkins Memorial Team1 vs Utica Team3', start: new Date(2024, 9, 25, 16, 0), end: new Date(2024, 9, 25, 18, 0) },
  { title: 'Senior - Watkins Memorial Team3 vs Johnstown Team4', start: new Date(2024, 9, 26, 16, 0), end: new Date(2024, 9, 26, 18, 0) },
  { title: 'Senior - Utica Team1 vs Heath Team1', start: new Date(2024, 9, 27, 16, 0), end: new Date(2024, 9, 27, 18, 0) },
  { title: 'Midi - Lakewood Team4 vs Johnstown Team2', start: new Date(2024, 9, 15, 16, 0), end: new Date(2024, 9, 15, 18, 0) },
  { title: 'Midi - Licking Heights Team4 vs Heath Team2', start: new Date(2024, 9, 16, 16, 0), end: new Date(2024, 9, 16, 18, 0) },
  { title: 'Junior - Heath Team2 vs Johnstown Team3', start: new Date(2024, 9, 17, 16, 0), end: new Date(2024, 9, 17, 18, 0) },
  { title: 'Junior - Licking Heights Team1 vs Lakewood Team3', start: new Date(2024, 9, 18, 16, 0), end: new Date(2024, 9, 18, 18, 0) },
  { title: 'Senior - Lakewood Team3 vs Johnstown Team2', start: new Date(2024, 9, 19, 16, 0), end: new Date(2024, 9, 19, 18, 0) },
  { title: 'Senior - Watkins Memorial Team1 vs Licking Heights Team3', start: new Date(2024, 9, 20, 16, 0), end: new Date(2024, 9, 20, 18, 0) },
  { title: 'Midi - Licking Heights Team2 vs Heath Team3', start: new Date(2024, 9, 8, 16, 0), end: new Date(2024, 9, 8, 18, 0) },
  { title: 'Midi - Licking Heights Team3 vs Utica Team2', start: new Date(2024, 9, 9, 16, 0), end: new Date(2024, 9, 9, 18, 0) },
  { title: 'Junior - Heath Team4 vs Johnstown Team3', start: new Date(2024, 9, 10, 16, 0), end: new Date(2024, 9, 10, 18, 0) },
  { title: 'Junior - Licking Heights Team1 vs Utica Team3', start: new Date(2024, 9, 11, 16, 0), end: new Date(2024, 9, 11, 18, 0) },
  { title: 'Senior - Watkins Memorial Team4 vs Licking Heights Team4', start: new Date(2024, 9, 12, 16, 0), end: new Date(2024, 9, 12, 18, 0) },
  { title: 'Senior - Watkins Memorial Team2 vs Licking Heights Team1', start: new Date(2024, 9, 13, 16, 0), end: new Date(2024, 9, 13, 18, 0) },
  { title: 'Midi - Licking Heights Team2 vs Lakewood Team3', start: new Date(2024, 9, 1, 16, 0), end: new Date(2024, 9, 1, 18, 0) },
  { title: 'Midi - Licking Heights Team1 vs Heath Team2', start: new Date(2024, 9, 2, 16, 0), end: new Date(2024, 9, 2, 18, 0) },
  { title: 'Junior - Licking Heights Team3 vs Heath Team4', start: new Date(2024, 9, 3, 16, 0), end: new Date(2024, 9, 3, 18, 0) },
  { title: 'Junior - Lakewood Team3 vs Heath Team1', start: new Date(2024, 9, 4, 16, 0), end: new Date(2024, 9, 4, 18, 0) },
  { title: 'Senior - Licking Heights Team1 vs Utica Team2', start: new Date(2024, 9, 5, 16, 0), end: new Date(2024, 9, 5, 18, 0) },
  { title: 'Senior - Watkins Memorial Team2 vs Lakewood Team1', start: new Date(2024, 9, 6, 16, 0), end: new Date(2024, 9, 6, 18, 0) }
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
