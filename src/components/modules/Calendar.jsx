import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { addEvent, updateEvent, removeEvent } from "../../features/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import AddEvent from "../modal/AddEvent";
import { openEventForm } from "../../utils/openEventForm";

const Calendar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.data);

  // State to manage the visibility of the event form modal
  const [showEventForm, setShowEventForm] = useState(false);
  // State to store details of the selected event
  const [selectedEvent, setSelectedEvent] = useState(null);
  // State to store the selected date
  const [selectedDate, setSelectedDate] = useState(null);
  // State to store the position of the event form modal
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  // State to track the mode of the form (dateClick or eventClick)
  const [formMode, setFormMode] = useState(null);

  // useEffect to apply styles to the event form modal after component update
  useEffect(() => {
    if (showEventForm) {
      const eventForm = document.getElementById("event-form");
      if (eventForm) {
        // Apply styles to position the event form modal
        eventForm.style.position = "absolute";
        eventForm.style.top = popupPosition.top;
        eventForm.style.left = popupPosition.left;
      }
    }
  }, [showEventForm, popupPosition]);

  // Click handler for dates in the calendar
  const handleDateClick = (arg) => {
    // Open the event form modal and set its position
    openEventForm(arg.jsEvent, setPopupPosition);

    setSelectedEvent({
      id: "",
      title: "",
      date: arg.dateStr,
      time: "",
      description: "",
    });
    setShowEventForm(true);
    setSelectedDate(arg.dateStr);
    setFormMode("dateClick");
  };

  // Click handler for specific events in the calendar
  const handleEventClick = (eventInfo) => {
    openEventForm(eventInfo.jsEvent, setPopupPosition);
    setShowEventForm(true);
    const clickedEvent = eventInfo.event.toPlainObject();
    setSelectedEvent({
      ...clickedEvent,
    });
    setSelectedDate(eventInfo.event.start.toISOString().split("T")[0]);
    setFormMode("eventClick");
  };

  // Custom content for displaying event details on the calendar
  const handleEventContent = (arg) => {
    return (
      <div>
        <strong>{arg.event.title}</strong>
        <br />
        {arg.event.extendedProps.time && (
          <span>{arg.event.extendedProps.time}</span>
        )}
        <br />
        {arg.event.extendedProps.description && (
          <span>{arg.event.extendedProps.description}</span>
        )}
      </div>
    );
  };

  // Navigate to day view page on click of a specific date
  const navigateToDayView = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    navigate(`/calendar/${formattedDate}`);
  };

  // Close the event form modal
  const closeEventForm = () => {
    setShowEventForm(false);
    setSelectedEvent(null);
  };

  // Add or update event
  const saveEventForm = (formData) => {
    if (formData.id) {
      // Dispatch action to update existing event
      dispatch(
        updateEvent({
          id: formData.id,
          title: formData.title,
          date: formData.start,
          time: formData.time,
          description: formData.description,
        })
      );
    } else {
      // Dispatch action to add a new event
      const newEvent = { ...formData, id: uuidv4() };
      dispatch(addEvent(newEvent));
    }
    closeEventForm();
  };

  // Delete a specific event using event id
  const deleteEvent = () => {
    if (selectedEvent) {
      dispatch(removeEvent({ id: selectedEvent.id }));
      closeEventForm();
    }
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        editable={true}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
        eventClick={(info) => handleEventClick(info)}
        eventContent={handleEventContent}
        now={new Date()}
        navLinks={true}
        navLinkDayClick={navigateToDayView}
        height={700}
      />
      {showEventForm && (
        // Add, update and remove event modal
        <AddEvent
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          selectedDate={selectedDate}
          formMode={formMode}
          saveEventForm={saveEventForm}
          deleteEvent={deleteEvent}
          closeEventForm={closeEventForm}
          popupPosition={popupPosition}
          setShowEventForm={showEventForm}
          showEventForm={showEventForm}
        />
      )}
    </div>
  );
};

export default Calendar;
