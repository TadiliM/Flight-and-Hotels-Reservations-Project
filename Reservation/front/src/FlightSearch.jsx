import React, {useState} from "react";

export default function FlightSearch({onChangeData}) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [depart, setDepart] = useState("");
  const [arrival, setArrival] = useState("");
  const [adults, setAdults] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = await fetch(
        `http://localhost:3000/flights?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${depart}&returnDate=${arrival}&adults=${adults}`
      );
      data = await data.json();
      onChangeData(data);
      
    } catch (error) {
        console.error("Error in searching flights", error);
        return;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          label={"Origin (Exemple : PAR for Paris)"}
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          label={"Destination (Exemple : RAK for Marrakech"}
        />
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
