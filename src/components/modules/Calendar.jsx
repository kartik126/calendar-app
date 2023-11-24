import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { addEvent, updateEvent, removeEvent } from "../../features/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import AddEvent from "../modal/AddEvent";

const Calendar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.data);

  console.log(events);

  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [formMode, setFormMode] = useState(null);

  //on click date handler
  const handleDateClick = (arg) => {
    setPopupPosition({
      top: arg.jsEvent.clientY - 10,
      left: arg.jsEvent.clientX - 150,
    });
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

  //navigatge to day view page on click of specific date
  const navigateToDayView = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    navigate(`/calendar/${formattedDate}`);
  };

  //handle specific event
  const handleEventClick = (eventInfo) => {
    setShowEventForm(true);
    const clickedEvent = eventInfo.event.toPlainObject();
    setSelectedEvent({
      ...clickedEvent,
    });
    setSelectedDate(eventInfo.event.start.toISOString().split("T")[0]);
    setFormMode("eventClick");
  };

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

  // Close the event form modal
  const closeEventForm = () => {
    setShowEventForm(false);
    setSelectedEvent(null);
  };

  //add or update event
  const saveEventForm = (formData) => {
    if (formData.id) {
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
      const newEvent = { ...formData, id: uuidv4() };
      dispatch(addEvent(newEvent));
    }
    closeEventForm();
  };

  //delete a specific event using event id
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
