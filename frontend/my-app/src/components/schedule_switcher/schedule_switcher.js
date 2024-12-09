// ScheduleSwitcher.js
import React, { useState } from 'react';
import ScheduleCalendar1 from '../schedule1/scheduleCalendar1';


const ScheduleSwitcher = () => {
  const [selectedGym, setSelectedGym] = useState('Gym 1'); // Default to Gym 1

  const renderSchedule = () => {
    switch (selectedGym) {
      case 'Watkins Memorial':
        return <ScheduleCalendar1 />;
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
