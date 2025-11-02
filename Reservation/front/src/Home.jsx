import React, { useState } from "react";
import FlightSearch from "./FlightSearch";
import Flight from "./Flight";
import { useEffect } from "react";

export default function Home() {
  const [dataFlights, setDataFlights] = useState([]);
  useEffect(() => {console.log(dataFlights)}, [dataFlights])

  return (
    <>
      <FlightSearch onChangeData={setDataFlights} />
      {dataFlights.map((flightInfo) => (
        <Flight key={flightInfo.id} info={flightInfo} />
      ))}
    </>
  );
}
