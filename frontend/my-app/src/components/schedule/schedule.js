import React, { useState, useContext, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { ScheduleContext } from '../scheduleContext/scheduleContext';
import './schedule.css'; // Add your custom styling
import EditEventModal from './editEventModal'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

const localizer = momentLocalizer(moment);
const DraggableCalendar = withDragAndDrop(Calendar); // Wrap the Calendar with withDragAndDrop

const gyms = [
  'Watkins Memorial',
  'Licking Heights',
  'Lakewood',
  'Utica',
  'Heath',
  'Johnstown',
];

const SchedulePage = ({ readOnly }) => {
    const { schedule, setSchedule } = useContext(ScheduleContext);
    const [selectedGym, setSelectedGym] = useState(gyms[0]);
    const [showModal, setShowModal] = useState(false);
    const [modalEvent, setModalEvent] = useState({ title: '', start: new Date(), end: new Date() });
    const [isEditing, setIsEditing] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState([]);
   
    // Log the schedule to verify updates
    useEffect(() => {
        console.log('Schedule in SchedulePage:', schedule); // Log schedule updates for debugging
    }, [schedule]); // This logs every time the schedule state updates

    // Filter events based on the selected gym and update `filteredEvents`
    useEffect(() => {
        const transformedSchedule = schedule.map(event => ({
        ...event,
        title: event.Matches,
        start: new Date(event.start),  // Convert start to Date object
        end: new Date(event.end)       // Convert end to Date object
        }));
        const eventsForSelectedGym = transformedSchedule.filter(event => event.Gym === selectedGym);
        setFilteredEvents(eventsForSelectedGym); // Update the filtered events
    }, [schedule, selectedGym]);

    // Transform the schedule to convert start and end times to Date objects
    // const transformedSchedule = schedule.map(event => ({
    //     ...event,
    //     title: event.Matches,
    //     start: new Date(event.start),  // Convert start to Date object
    //     end: new Date(event.end)       // Convert end to Date object
    // }));
    

    // Filter events based on the selected gym
    // const filteredEvents = transformedSchedule.filter(event => event.location === selectedGym);

    // Open the modal for adding or editing an event
    const openModal = (event = { title: '', start: new Date(), end: new Date() }, editing = false) => {
        if (readOnly) return; // Prevent opening the modal if read-only
        setModalEvent(event);
        setIsEditing(editing);
        setShowModal(true);
    };

    // Handle modal form submission
    const handleFormSubmit = () => {
        if (readOnly) return; // Prevent form submission if read-only
        if (isEditing) {
            // Edit the existing event by finding the matching event using unique properties
            const updatedSchedule = schedule.map(e => 
                (e.Date === modalEvent.Date && e.Time === modalEvent.Time && e.Gym === modalEvent.Gym && e.Matches === modalEvent.Matches)
                    ? { ...e, Matches: modalEvent.title, start: modalEvent.start, end: modalEvent.end }
                    : e
            );
            setSchedule(updatedSchedule);
            saveScheduleToBackend(updatedSchedule);
        } else {
            // Add a new event
            const newEvent = {
                ...modalEvent,
                Date: modalEvent.start.toISOString().split('T')[0],
                Time: `${moment(modalEvent.start).format('HH:mm')}-${moment(modalEvent.end).format('HH:mm')}`,
                Gym: selectedGym,
                Matches: modalEvent.title,
                Week: "", // Add the "Week" field
            };
            const updatedSchedule = [...schedule, newEvent];
            setSchedule(updatedSchedule);
            saveScheduleToBackend(updatedSchedule);
        }
        setShowModal(false);
    };

    // Function to delete a specific event
    const handleDeleteEvent = (event) => {
        if (readOnly) return; // Prevent deletion if read-only
    
        // Show confirmation prompt
        const isConfirmed = window.confirm("Are you sure you want to delete this event?");
        
        if (isConfirmed) {
            // Proceed with deletion if the user confirms
            const updatedSchedule = schedule.filter(e => 
                !(e.Date === event.Date && e.Time === event.Time && e.Gym === event.Gym && e.Matches === event.Matches)
            );
            setSchedule(updatedSchedule);
            saveScheduleToBackend(updatedSchedule);
            setShowModal(false); // Close the edit modal
        }
    };

    // Function to handle event drop
    const handleEventDrop = ({ event, start, end }) => {
        // Close the modal when a drag event is initiated
        if (showModal) {
            setShowModal(false); // Close the edit modal
        }
        // Update the specific event with the new start and end times
        const updatedSchedule = schedule.map(e => {
          if (e.Date === event.Date && e.Time === event.Time && e.Gym === event.Gym && e.Matches === event.Matches) {
            // Update start and end as Date objects
            return {
              ...e,
              Date: start.toISOString().split('T')[0], // Update Date
              Time: `${moment(start).format('HH:mm')}-${moment(end).format('HH:mm')}`, // Update Time
              start, // Update the start time
              end,   // Update the end time
            };
          }
          return e;
        });
      
        setSchedule(updatedSchedule); // Update the state
        saveScheduleToBackend(updatedSchedule); // Save the updated schedule to the backend
    };

    const backend_host = "http://127.0.0.1:5000";
    // Function to save the schedule to the backend
    const saveScheduleToBackend = async (updatedSchedule) => {
        // Transform the schedule to have "Date" and "Time" fields
        const formattedSchedule = updatedSchedule.map(event => {
          // Ensure start and end are strings in the correct format
          const startString = moment(event.start).format('YYYY-MM-DD HH:mm'); // Format as string
          const endString = moment(event.end).format('YYYY-MM-DD HH:mm');     // Format as string
      
          return {
            Gym: event.Gym,
            Week: event.Week,
            Matches: event.Matches,
            Date: startString.split(' ')[0], // Extract date from "startString"
            Time: `${startString.split(' ')[1]}-${endString.split(' ')[1]}`, // Format time slot
          };
        });
      
        try {
          const response = await fetch(`${backend_host}/save-schedule`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formattedSchedule),
          });
      
          if (!response.ok) {
            alert('Failed to save schedule to the backend.');
          } else {
            // alert('Schedule saved successfully!');
          }
        } catch (error) {
          console.error('Error saving schedule:', error);
          alert('Error saving schedule.');
        }
    };

    // Function to convert the schedule data to CSV and download it
    const exportScheduleToCSV = () => {
        const headers = ["Gym", "Week", "Matches", "Date", "Time"];
      
        const csvRows = [
          headers.join(","), // Add headers
          ...schedule.map(event => {
            // Convert the start and end times to the correct Date and Time format
            const startDate = moment(event.start).format('YYYY-MM-DD');
            const startTime = moment(event.start).format('HH:mm');
            const endTime = moment(event.end).format('HH:mm');
            const timeSlot = `${startTime}-${endTime}`;
      
            return [event.Gym, event.Week, event.Matches, startDate, timeSlot].join(",");
          })
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

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="calendar-wrapper">
                <h2 className="calendar-title">Team Schedule</h2>
                <div className="gym-tabs">
                    {gyms.map(gym => (
                    <button
                        key={gym}
                        className={`gym-tab ${selectedGym === gym ? 'active' : ''}`}
                        onClick={() => {
                            setSelectedGym(gym);
                            setShowModal(false);
                        }}
                    >
                        {gym}
                    </button>
                    ))}
                </div>
                <div style={{ height: '60vh' }}>
                    <DraggableCalendar
                    localizer={localizer}
                    events={filteredEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    selectable={!readOnly} // Disable selection if read-only
                    onSelectEvent={event => !readOnly && openModal(event, true)} // Edit event when selected
                    onSelectSlot={({ start, end }) => !readOnly && openModal({ title: '', start, end }, false)} // Add event on slot select
                    onEventDrop={handleEventDrop} // Handle event drop
                    draggableAccessor={() => !readOnly} // Make events draggable
                    />
                    <div className="export-button">
                        <button 
                            onClick={() => {
                                exportScheduleToCSV();
                                setShowModal(false); // Close the modal
                            }}
                        >  
                            Export Schedule
                        </button>
                    </div>
                </div >
                {showModal && (
                    <>
                        <div className="overlay" onClick={() => setShowModal(false)}></div> {/* Dark overlay */}
                        <div className="modal-wrapper">
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
                    </>
                )}
            </div>
        </DndProvider>
    );
};

export default SchedulePage;
