import React, { useState, useContext, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { ScheduleContext } from "../scheduleContext/scheduleContext";
import "./schedule.css"; // Add your custom styling
import EditEventModal from "./editEventModal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

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

const SchedulePage = ({ readOnly }) => {
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

  const backend_host = "http://127.0.0.1:5000";
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
        <div style={{ height: "60vh" }}>
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
            <button
              onClick={() => {
                exportScheduleToCSV();
                setShowModal(false);
              }}
            >
              Export Schedule
            </button>
          </div>
        </div>
        {showModal && (
          <>
            <div className="overlay" onClick={() => setShowModal(false)}></div>
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
