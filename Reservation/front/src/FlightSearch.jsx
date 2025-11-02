import React, { useState } from "react";
import iataCodes from "./iataCodes";
import Select from "react-select";
import "./FlightSearch.css";

export default function FlightSearch({ onChangeData, onChangeAirLinesNames, setIsLoading }) {
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
      setIsLoading(true);
      //onChangeData(["Chargement"]);

      let endpoint = `http://localhost:3000/flights?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${depart}&adults=${adults}`;
      endpoint += arrival !== "" ? `&returnDate=${arrival}` : "";

      let data = await fetch(endpoint);

      data = await data.json();

      const airLinesNames = data?.dictionaries?.carriers;
      onChangeAirLinesNames(airLinesNames);
      data =  Array.isArray(data.data) ? data.data : [];      
      console.log("Final data:", data);


      onChangeData(data);
      setIsLoading(false)
    } catch (error) {
      console.error("Error in searching flights", error);
      return;
    }
  };

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
