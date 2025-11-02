import React from "react";
import './Flight.css'

export default function Flight({ info }) {
  const { price, validatingAirlineCodes, itineraries } = info;
  const { total, currency } = price;
  const depart = itineraries[0];
  let arriv = "";
  let text = "";
  if (itineraries.length >= 1) {
    arriv = itineraries[1];
    text = (
      <div>
        <h3>
          return from {arriv.segments[0].departure.iataCode} to{" "}
          {arriv.segments[arriv.segments.length - 1].arrival.iataCode}
        </h3>
        <p>Duration : {arriv.duration}</p>
      </div>
    );
  }

  return (
    <div className="flight-card">
      <div className="flight-header">
        <h3>{validatingAirlineCodes.join(", ")}</h3>
        <span className="price">
          {total} {currency}
        </span>
      </div>

      <div className="flight-section">
        <h4>Aller</h4>
        <p>
          ✈️ {depart.segments[0].departure.iataCode} →{" "}
          {depart.segments[depart.segments.length - 1].arrival.iataCode}
        </p>
        <p>
          🕒 {depart.segments[0].departure.at} →{" "}
          {depart.segments[depart.segments.length - 1].arrival.at}
        </p>
        <p>⏱️ Durée : {depart.duration}</p>
      </div>

      {arriv && (
        <div className="flight-section">
          <h4>Retour</h4>
          <p>
            ✈️ {arriv.segments[0].departure.iataCode} →{" "}
            {arriv.segments[arriv.segments.length - 1].arrival.iataCode}
          </p>
          <p>
            🕒 {arriv.segments[0].departure.at} →{" "}
            {arriv.segments[arriv.segments.length - 1].arrival.at}
          </p>
          <p>⏱️ Durée : {arriv.duration}</p>
        </div>
      )}
    </div>
  );
}
