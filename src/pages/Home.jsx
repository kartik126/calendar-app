import React from "react";
import Container from "../components/layouts/Container";
import Calendar from "../components/modules/Calendar";

function Home() {
  return (
    <Container>
      <h1 className="text-xl font-bold">Calendar</h1>
      <div className="p-20">
        <Calendar />
      </div>
    </Container>
  );
}

export default Home;
