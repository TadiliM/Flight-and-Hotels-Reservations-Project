import { response } from "express";
import React from "react";
import { useEffect, useState } from "react";

export default function Reservations() {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/reservations`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error in displaying books", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Mes Reservations :</h1>
      <ul>
        {data.map((reservation, index) => (
          <li key={index}>
            {reservation.hotel} - {reservation.flight}
          </li>
        ))}
      </ul>
    </>
  );
}
