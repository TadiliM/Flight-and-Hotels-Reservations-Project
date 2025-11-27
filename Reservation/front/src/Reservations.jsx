//import { response } from "express";
import { useState, useEffect } from "react";
import "./Reservations.css";

export default function Reservations() {
  const [data, setData] = useState([]);

  useEffect(() => {
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
  }, [data]);

  async function removeFirst(id) {
    const endpoint = `http://localhost:3000/reservations/${id}`;
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch(endpoint, options);
      console.log("bien supprimé");
      setData(data.filter((r) => r !== id));
    } catch (error) {
      console.error("Erreur supprission :", error);
    }
  }

  return (
    <div className="reservations-container">
      <h1>My Reservations</h1>
      <ul className="reservations-list">
        {data.map((reservation) => (
          <li className="reservation-item" key={reservation.id}>
            <span className="reservation-info">
              {reservation.flight}
            </span>
            <button className="reservation-remove" onClick={() => removeFirst(reservation.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
