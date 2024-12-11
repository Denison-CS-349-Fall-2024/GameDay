import React, { useState, useContext, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { ScheduleContext } from '../scheduleContext/scheduleContext';
import './schedule.css'; // Add your custom styling
import EditEventModal from './editEventModal'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import Papa from 'papaparse'; // Import papaparse for CSV parsing

const localizer = momentLocalizer(moment);
const DraggableCalendar = withDragAndDrop(Calendar); // Wrap the Calendar with withDragAndDrop

const gyms = [
  "Watkins Memorial",
  "Licking Heights",
  "Lakewood",
  "Utica",
  "Heath",
  "Johnstown",
];

const SchedulePage = ({ readOnly, allowImport }) => {
  const { schedule, setSchedule } = useContext(ScheduleContext);
  const [selectedGym, setSelectedGym] = useState(gyms[0]);
  const [showModal, setShowModal] = useState(false);
  const [modalEvent, setModalEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
  });
  const [isEditing, setIsEditing] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Log the schedule to verify updates
  useEffect(() => {
    console.log("Schedule in SchedulePage:", schedule);
  }, [schedule]);

  // Filter events based on the selected gym and update `filteredEvents`
  useEffect(() => {
    const transformedSchedule = schedule.map((event) => ({
      ...event,
      title: event.Matches,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
    const eventsForSelectedGym = transformedSchedule.filter(
      (event) => event.Gym === selectedGym
    );
    setFilteredEvents(eventsForSelectedGym);
  }, [schedule, selectedGym]);

  // Open the modal for adding or editing an event
  const openModal = (
    event = { title: "", start: new Date(), end: new Date() },
    editing = false
  ) => {
    if (readOnly) return;
    setModalEvent(event);
    setIsEditing(editing);
    setShowModal(true);
  };

  // Handle modal form submission
  const handleFormSubmit = () => {
    if (readOnly) return;
    if (isEditing) {
      const updatedSchedule = schedule.map((e) =>
        e.Date === modalEvent.Date &&
        e.Time === modalEvent.Time &&
        e.Gym === modalEvent.Gym &&
        e.Matches === modalEvent.Matches
          ? {
              ...e,
              Matches: modalEvent.title,
              start: modalEvent.start,
              end: modalEvent.end,
            }
          : e
      );
      setSchedule(updatedSchedule);
      saveScheduleToBackend(updatedSchedule);
    } else {
      const newEvent = {
        ...modalEvent,
        Date: modalEvent.start.toISOString().split("T")[0],
        Time: `${moment(modalEvent.start).format("HH:mm")}-${moment(
          modalEvent.end
        ).format("HH:mm")}`,
        Gym: selectedGym,
        Matches: modalEvent.title,
        Week: "",
      };
      const updatedSchedule = [...schedule, newEvent];
      setSchedule(updatedSchedule);
      saveScheduleToBackend(updatedSchedule);
    }
    setShowModal(false);
  };

  // Function to delete a specific event
  const handleDeleteEvent = (event) => {
    if (readOnly) return;
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (isConfirmed) {
      const updatedSchedule = schedule.filter(
        (e) =>
          !(
            e.Date === event.Date &&
            e.Time === event.Time &&
            e.Gym === event.Gym &&
            e.Matches === event.Matches
          )
      );
      setSchedule(updatedSchedule);
      saveScheduleToBackend(updatedSchedule);
      setShowModal(false);
    }
  };

  // Function to handle event drop
  const handleEventDrop = ({ event, start, end }) => {
    if (showModal) {
      setShowModal(false);
    }
    const updatedSchedule = schedule.map((e) => {
      if (
        e.Date === event.Date &&
        e.Time === event.Time &&
        e.Gym === event.Gym &&
        e.Matches === event.Matches
      ) {
        return {
          ...e,
          Date: start.toISOString().split("T")[0],
          Time: `${moment(start).format("HH:mm")}-${moment(end).format(
            "HH:mm"
          )}`,
          start,
          end,
        };
      }
      return e;
    });

    setSchedule(updatedSchedule);
    saveScheduleToBackend(updatedSchedule);
  };

    // Function to save schedule to backend from website change
    const backend_host = "http://50.19.159.206:5000";
    // const backend_host = "http://127.0.0.1:5000"
    const saveScheduleToBackend = async (updatedSchedule) => {
        const formattedSchedule = updatedSchedule.map((event) => {
            const startString = moment(event.start).format("YYYY-MM-DD HH:mm");
            const endString = moment(event.end).format("YYYY-MM-DD HH:mm");

            return {
                Gym: event.Gym,
                Week: event.Week,
                Matches: event.Matches,
                Date: startString.split(" ")[0],
                Time: `${startString.split(" ")[1]}-${endString.split(" ")[1]}`,
            };
        });

        try {
            const response = await fetch(`${backend_host}/save-schedule`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedSchedule),
        });

        if (!response.ok) {
            alert("Failed to save schedule to the backend.");
        }
        } catch (error) {
            console.error("Error saving schedule:", error);
            alert("Error saving schedule.");
        }
  };

    // Function to save schedule to backend from imported schedule
    // New function to save the imported schedule to the backend
    const importScheduleToBackend = async (importedSchedule) => {
        const formattedSchedule = importedSchedule.map((event) => {
        return {
            Gym: event.Gym,
            Week: event.Week,
            Matches: event.Matches,
            Date: event.Date,
            Time: event.Time,
        };
        });
    
        try {
        const response = await fetch(`${backend_host}/save-schedule`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formattedSchedule),
        });
    
        if (!response.ok) {
            alert('Failed to save imported schedule to the backend.');
        } else {
            alert('Schedule imported successfully!');
        }
        } catch (error) {
        console.error('Error saving imported schedule:', error);
        alert('Error saving imported schedule.');
        }
    };

    // Function to handle the imported CSV and save to the backend
    const handleImportSchedule = (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        Papa.parse(file, {
        header: true, // Use the first row as keys for the data
        skipEmptyLines: true, // Skip empty rows
        complete: (result) => {
            const importedData = result.data.map((row) => ({
            Gym: row.Gym,
            Week: row.Week,
            Matches: row.Matches,
            Date: row.Date,
            Time: row.Time,
            start: new Date(`${row.Date}T${row.Time.split('-')[0]}`),
            end: new Date(`${row.Date}T${row.Time.split('-')[1]}`),
            }));
    
            // Save the imported schedule to the backend
            importScheduleToBackend(importedData);
    
            // Update the local schedule state
            setSchedule((prevSchedule) => [...prevSchedule, ...importedData]);
        },
        error: (error) => {
            console.error('Error parsing CSV file:', error);
            alert('Failed to parse the CSV file. Please check the format.');
        },
        });
    };
    
    // Export schedule to csv
    const exportScheduleToCSV = () => {
        const headers = ["Gym", "Week", "Matches", "Date", "Time"];
        const csvRows = [
            headers.join(","),
            ...schedule.map((event) => {
                const startDate = moment(event.start).format("YYYY-MM-DD");
                const startTime = moment(event.start).format("HH:mm");
                const endTime = moment(event.end).format("HH:mm");
                const timeSlot = `${startTime}-${endTime}`;
                return [event.Gym, event.Week, event.Matches, startDate, timeSlot].join(
                ","
                );
            }),
        ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "schedule.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

    // Export schedule to ics file
    const exportScheduleToICS = () => {
        const headers = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Your App Name//NONSGML v1.0//EN",
        ];
    
        // Create iCalendar events from the schedule
        const events = schedule.map(event => {
            const startDate = moment(event.start).utc().format("YYYYMMDDTHHmmss[Z]"); // UTC format
            const endDate = moment(event.end).utc().format("YYYYMMDDTHHmmss[Z]"); // UTC format
            const uid = `${event.Matches}-${event.Date}-${event.Time}`.replace(/\s+/g, "-"); // Unique ID for each event
    
            return [
                "BEGIN:VEVENT",
                `UID:${uid}`,
                `DTSTAMP:${moment().utc().format("YYYYMMDDTHHmmss[Z]")}`, // Current timestamp
                `DTSTART:${startDate}`,
                `DTEND:${endDate}`,
                `SUMMARY:${event.Matches}`, // Event title
                `DESCRIPTION:Gym: ${event.Gym}, Week: ${event.Week}`, // Event details
                "END:VEVENT",
            ].join("\n");
        });
    
        const footer = ["END:VCALENDAR"];
    
        // Combine the headers, events, and footer into a single .ics file content
        const icsContent = [...headers, ...events, ...footer].join("\n");
    
        // Create a downloadable .ics file
        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "schedule.ics";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const [showExportModal, setShowExportModal] = useState(false);

    const handleExport = (type) => {
    if (type === 'csv') {
        exportScheduleToCSV();
    } else if (type === 'ics') {
        exportScheduleToICS();
    }
    setShowExportModal(false); // Close modal after exporting
    };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="calendar-wrapper">
        <h2 className="calendar-title">Team Schedule</h2>
        <div className="gym-tabs">
          {gyms.map((gym) => (
            <button
              key={gym}
              className={`gym-tab ${selectedGym === gym ? "active" : ""}`}
              onClick={() => {
                setSelectedGym(gym);
                setShowModal(false);
              }}
            >
              {gym}
            </button>
          ))}
        </div>
        <div style={{ height: "65vh" }}>
          <DraggableCalendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            selectable={!readOnly}
            onSelectEvent={(event) => !readOnly && openModal(event, true)}
            onSelectSlot={({ start, end }) =>
              !readOnly && openModal({ title: "", start, end }, false)
            }
            onEventDrop={handleEventDrop}
            draggableAccessor={() => !readOnly}
          />
            <div className="export-button">
                <button onClick={() => setShowExportModal(true)}>Export Schedule</button>
                {allowImport && ( // Conditionally render Import Schedule button
                    <>
                        <button onClick={() => document.getElementById('import-schedule').click()}>
                        Import Schedule
                        </button>
                        <input
                        type="file"
                        id="import-schedule"
                        className="import-file-input"
                        accept=".csv"
                        onChange={handleImportSchedule}
                        />
                    </>
                )}
            </div>

            {showExportModal && (
            <div className="export-modal">
                <div className="export-modal-content">
                <p>Select the file type to export:</p>
                <div className="export-options">
                    <button onClick={() => handleExport('csv')}>Export as CSV</button>
                    <button onClick={() => handleExport('ics')}>Export as ICS</button>
                    <button onClick={() => setShowExportModal(false)}>Cancel</button>
                </div>
                </div>
            </div>
            )}
        </div>
        {showModal && (
          <>
            <div className="overlay" onClick={() => setShowModal(false)}></div>
            <div className="modal-wrapper">
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <EditEventModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    modalEvent={modalEvent}
                    setModalEvent={setModalEvent}
                    handleFormSubmit={handleFormSubmit}
                    handleDeleteEvent={handleDeleteEvent}
                    isEditing={isEditing}
                    />
                </div>
              
            </div>
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default SchedulePage;
