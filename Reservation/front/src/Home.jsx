import React, { useState } from "react";
import FlightSearch from "./FlightSearch";
import Flight from "./Flight";

export default function Home() {
  const [dataFlights, setDataFlights] = useState([]);

  return (
    <>
      <FlightSearch onChangeData={setDataFlights} />
      {dataFlights.map((flightInfo) => (
        <Flight key={flightInfo.id} info={flightInfo} />
      ))}
    </>
  );
}
