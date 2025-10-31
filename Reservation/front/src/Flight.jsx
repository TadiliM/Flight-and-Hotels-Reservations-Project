import React from "react";

export default function Flight({ flightInfo }) {
  const { price, validatingAirlineCodes, itineraries } = flightInfo;
  const { total, currency } = price;
  const { duration, segments } = itineraries;
  const { departure } = segments[0];
  const { arrival } = segments.pop();

  return (
    <div>
      <h3>
        From {departure.iataCode} at {departure.at} to {arrival.iataCode} at{" "}
        {arrival.at}
      </h3>
      <p>
        Duration : {duration}, with {validatingAirlineCodes}
      </p>
      <p>
        {total} {currency}
      </p>
    </div>
  );
}
