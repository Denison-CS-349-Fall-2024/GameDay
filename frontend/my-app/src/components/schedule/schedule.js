import React, { useState, useContext, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Modal, Button, Form } from 'react-bootstrap';
import moment from 'moment';
import { ScheduleContext } from '../scheduleContext/scheduleContext';
import './schedule.css'; // Add your custom styling

const localizer = momentLocalizer(moment);

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
            // Calculate the "Week" based on the date of the event
            // const eventDate = new Date(modalEvent.start);
            // const weekNumber = Math.ceil((eventDate.getDate() - eventDate.getDay() + 1) / 7); // Calculate the week number
            // const week = `Week ${weekNumber}`;
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
        if (readOnly) return; // Prevent form submission if read-only
        const updatedSchedule = schedule.filter(e => 
        !(e.Date === event.Date && e.Time === event.Time && e.Gym === event.Gym && e.Matches === event.Matches)
        );
        setSchedule(updatedSchedule);
        saveScheduleToBackend(updatedSchedule);
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
            alert('Schedule saved successfully!');
          }
        } catch (error) {
          console.error('Error saving schedule:', error);
          alert('Error saving schedule.');
        }
    };

    return (
        <div className="calendar-wrapper">
            <h2 className="calendar-title">Team Schedule</h2>
            <div className="gym-tabs">
                {gyms.map(gym => (
                <button
                    key={gym}
                    className={`gym-tab ${selectedGym === gym ? 'active' : ''}`}
                    onClick={() => setSelectedGym(gym)}
                >
                    {gym}
                </button>
                ))}
            </div>
            <div style={{ height: '80vh' }}>
                <Calendar
                localizer={localizer}
                events={filteredEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable={!readOnly} // Disable selection if read-only
                onSelectEvent={event => !readOnly && openModal(event, true)} // Edit event when selected
                onSelectSlot={({ start, end }) => !readOnly && openModal({ title: '', start, end }, false)} // Add event on slot select
                />
                <div className="export-button">
                    <button>Export Schedule</button>
                </div>
            </div>
                {/* Modal for Adding/Editing Events */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Edit Event' : 'Add Event'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formEventTitle">
                    <Form.Label>Event Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={modalEvent.title}
                        onChange={(e) => setModalEvent({ ...modalEvent, title: e.target.value })}
                    />
                    </Form.Group>
                    <Form.Group controlId="formEventStart">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={moment(modalEvent.start).format('YYYY-MM-DDTHH:mm')}
                        onChange={(e) => setModalEvent({ ...modalEvent, start: new Date(e.target.value) })}
                    />
                    </Form.Group>
                    <Form.Group controlId="formEventEnd">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={moment(modalEvent.end).format('YYYY-MM-DDTHH:mm')}
                        onChange={(e) => setModalEvent({ ...modalEvent, end: new Date(e.target.value) })}
                    />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                {isEditing && (
                    <Button variant="danger" onClick={() => handleDeleteEvent(modalEvent)}>
                    Delete
                    </Button>
                )}
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleFormSubmit}>
                    Save
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SchedulePage;
