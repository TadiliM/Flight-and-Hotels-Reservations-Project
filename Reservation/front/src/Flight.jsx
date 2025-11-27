import React from "react";
import "./Flight.css";

export default function Flight({ info, airLinesNames }) {
  const { price, validatingAirlineCodes, itineraries } = info;
  const { total, currency } = price;
  const depart = itineraries[0];
  let retour = "";
  if (itineraries.length >= 1) {
    retour = itineraries[1];
  }

  const departDate1 = new Date(depart.segments[0].departure.at).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const departDate2 = new Date(depart.segments[depart.segments.length - 1].arrival.at).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let arrivalDate1 = "";
  let arrivalDate2 = "";
  if (retour) {
    arrivalDate1 = new Date(retour.segments[0].departure.at).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    arrivalDate2 = new Date(retour.segments[retour.segments.length - 1].arrival.at).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  }

  function formatDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    const hours = match[1] ? match[1].replace("H", "") : "0";
    const minutes = match[2] ? match[2].replace("M", "") : "0";
    return `${hours}h ${minutes}min`;
  }

  async function handleClickBook() {
    const data = {
      flight: `${depart.segments[0].departure.iataCode} → ${depart.segments[depart.segments.length - 1].arrival.iataCode} | ${departDate1} → ${departDate2} | ${validatingAirlineCodes.map(code => airLinesNames[code] || code).join(", ")} | ${total} ${currency}`
    };
    const endpoint = `http://localhost:3000/reservations`;
    const options = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }; 
    try {
      const response = await fetch(endpoint, options);
      alert("Registration reserved ! Good trip ! See details in Reservations.")
    } catch (error) {
      console.error("Error in booking", error)
    }
  }

  return (
    <div className="flight-card">
      <div className="flight-header">
        <h3>{validatingAirlineCodes.map(code => airLinesNames[code] || code).join(", ")}</h3>
        <span className="price">
          {total} {currency}
        </span>
      <button onClick={handleClickBook}>Reserve</button>
      </div>

      <div className="flight-section">
        <h4>Depart</h4>
        <p>
          ✈️ {depart.segments[0].departure.iataCode} →{" "}
          {depart.segments[depart.segments.length - 1].arrival.iataCode}
        </p>
        <p>
          🕒 {departDate1} →{" "}
          {departDate2}
        </p>
        <p>⏱️ Duration : {formatDuration(depart.duration)}</p>
      </div>

      {retour && (
        <div className="flight-section">
          <h4>Return</h4>
          <p>
            ✈️ {retour.segments[0].departure.iataCode} →{" "}
            {retour.segments[retour.segments.length - 1].arrival.iataCode}
          </p>
          <p>
            🕒 {arrivalDate1} →{" "}
            {arrivalDate2}
          </p>
          <p>⏱️ Duration : {formatDuration(retour.duration)}</p>
        </div>
      )}
    </div>
  );
}
