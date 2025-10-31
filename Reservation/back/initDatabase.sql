CREATE DATABASE IF NOT EXISTS Reservations_db;

\c Reservations_db;

CREATE TABLE IF NOT EXISTS reservation (
    id SERIAL PRIMARY KEY, 
    hotel VARCHAR(255),
    flight VARCHAR(255)
);

