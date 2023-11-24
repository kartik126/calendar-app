import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DayView = () => {
  const { date } = useParams();
  const events = useSelector((state) =>
    state.events.data.filter((event) => event.start.includes(date))
  );
  const history = useHistory();

  const handleEventClick = (eventId) => {
    // Implement your logic for handling event click in day view
    console.log('Event clicked in day view:', eventId);
  };

  return (
    <div>
      <h1>Day View - {date}</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} onClick={() => handleEventClick(event.id)}>
            {event.title}
          </li>
        ))}
      </ul>
      <button onClick={() => history.push('/calendar')}>Back to Calendar</button>
    </div>
  );
};

export default DayView;
