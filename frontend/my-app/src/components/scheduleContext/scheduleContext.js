// ScheduleContext.js
import React, { createContext, useState, useEffect } from 'react';

export const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
    const [schedule, setSchedule] = useState([]);

    // Log the schedule to verify updates
    useEffect(() => {
        console.log('Provider schedule:', schedule); // Log schedule updates for debugging
    }, [schedule]); // This logs every time the schedule state updates

    return (
        <ScheduleContext.Provider value={{ schedule, setSchedule }}>
            {children}
        </ScheduleContext.Provider>
    );
};
