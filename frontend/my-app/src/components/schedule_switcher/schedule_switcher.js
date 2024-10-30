// ScheduleSwitcher.js
import React, { useState } from 'react';
import ScheduleCalendar1 from '../schedule1/scheduleCalendar1';
import ScheduleCalendar2 from '../schedule2/scheduleCalendar2';
import ScheduleCalendar3 from '../schedule3/scheduleCalendar3';
import ScheduleCalendar4 from '../schedule4/scheduleCalendar4';
import ScheduleCalendar5 from '../schedule5/scheduleCalendar5';
import ScheduleCalendar6 from '../schedule6/scheduleCalendar6';


const ScheduleSwitcher = () => {
  const [selectedGym, setSelectedGym] = useState('Gym 1'); // Default to Gym 1

  const renderSchedule = () => {
    switch (selectedGym) {
      case 'Watkins Memorial':
        return <ScheduleCalendar1 />;
      case 'Licking Heights':
        return <ScheduleCalendar2 />;
      case 'Lakewood':
        return <ScheduleCalendar3 />;
      case 'Utica':
        return <ScheduleCalendar4 />;
      case 'Heath':
        return <ScheduleCalendar5 />;
      case 'Johnstown':
        return <ScheduleCalendar6 />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Select Gym Schedule</h2>
      <div className="button-group">
        <button onClick={() => setSelectedGym('Watkins Memorial')}>Watkins Memorial</button>
        <button onClick={() => setSelectedGym('Licking Heights')}>Licking Heights</button>
        <button onClick={() => setSelectedGym('Lakewood')}>Lakewood</button>
        <button onClick={() => setSelectedGym('Utica')}>Utica</button>
        <button onClick={() => setSelectedGym('Heath')}>Heath</button>
        <button onClick={() => setSelectedGym('Johnstown')}>Johnstown</button>
      </div>

      {/* Render the selected schedule */}
      <div className="schedule-view">
        {renderSchedule()}
      </div>
    </div>
  );
};

export default ScheduleSwitcher;
