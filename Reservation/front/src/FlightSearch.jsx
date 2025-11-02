import React, { useState } from "react";
import iataCodes from "./iataCodes";
import Select from 'react-select';
import './FlightSearch.css'

export default function FlightSearch({ onChangeData }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [depart, setDepart] = useState("");
  const [arrival, setArrival] = useState("");
  const [adults, setAdults] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending request with params:", {
        origin,
        destination,
        depart,
        arrival,
        adults,
      });
      let data = await fetch(
        `http://localhost:3000/flights?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${depart}&returnDate=${arrival}&adults=${adults}`
      );
      console.log("Raw response:", data);
      data = await data.json();
      console.log("Parsed response:", data);
      data = data.data;
      console.log("Final data:", data);
      alert(JSON.stringify(data, null, 2));
      onChangeData(data);
    } catch (error) {
      console.error("Error in searching flights", error);
      return;
    }
  };

  const options = iataCodes.map(a => ({ value: a, label: a }));

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          label={"Origin (Exemple : PAR for Paris)"}
        >
          {iataCodes.map((code) => (
            <option>{code}</option>
          ))}
        </select>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          label={"Destination (Exemple : RAK for Marrakech"}
        >
          {iataCodes.map((code) => (
            <option>{code}</option>
          ))}
        </select>
        <input
          type="date"
          value={depart}
          onChange={(e) => setDepart(e.target.value)}
        />
        <input
          type="date"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          placeholder="Return date"
        />
        <input
          type="number"
          min="1"
          value={adults}
          onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
          placeholder="Number of adults"
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
}
