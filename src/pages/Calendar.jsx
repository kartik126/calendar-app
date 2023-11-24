import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "../components/layouts/Container";

function Calendar() {

  const { date } = useParams();

  const events = useSelector((state) => state.events.data);

  //get events for specific date 
  const filterEvents = events.filter((event) => event.date === date);

  console.log(filterEvents);

  return (
    <Container>
      <div className="text-center text-gray-800">
        <h4 className="text-lg font-bold ">My Events on {date}</h4>
        <ul>
          {filterEvents.length > 0 ? (
            filterEvents.map((event) => {
              return (
                <li className="text-sm">
                  {event.title} {event.time}
                </li>
              );
            })
          ) : (
            <li>No events</li>
          )}
        </ul>
      </div>
    </Container>
  );
}

export default Calendar;
