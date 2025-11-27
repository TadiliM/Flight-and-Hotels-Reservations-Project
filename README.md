

# 🎬 Demo Video

<p align="center">
  <a href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID" target="_blank">
    <img src="https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg" alt="Watch the demo video" width="600"/>
  </a>
</p>

# 🌍 Flight and Hotel Reservation Platform

This is a full stack student project allowing users to search for flights, book, and manage their reservations, using a modern React/Node/PostgreSQL architecture and integrating an external API (Amadeus).

## Main Features
- Flight search (Amadeus API)
- View and delete reservations
- Multi-page navigation (Home, Reservations, About)

## Project Architecture

```
Reservation/
  back/    → Node.js/Express server (REST API, database management)
  front/   → React application (UI, navigation, API calls)
```

## 1. Front-end (React + Vite)
- React 19, React Router, React Select
- Pages: Home (flight search), Reservations (list/delete), About
- Components: FlightSearch, Flight, Reservations, etc.
- API calls to the back-end for search and reservation management

## 2. Back-end (Node.js + Express)
- REST routes:
  - `/flights`: flight search via Amadeus
  - `/reservations`: CRUD for reservations (PostgreSQL)
- Uses dotenv for configuration
- CORS security for local front-end

## 3. Database (PostgreSQL)
- Main table: `reservation (id SERIAL PRIMARY KEY, flight VARCHAR)`
- Initialization script: `initDatabase.sql`

## 4. External API: Amadeus
- OAuth2 authentication (token)
- Real-time flight search

## Installation & Launch

### Prerequisites
- Node.js, npm
- PostgreSQL (or SQLite)

### 1. Back-end
```bash
cd Reservation/back
npm install
# Configure .env with your DB and Amadeus credentials
npm start
```

### 2. Front-end
```bash
cd Reservation/front
npm install
npm run dev
```

### 3. Database
Import the `initDatabase.sql` script into your PostgreSQL DBMS.

## Example Usage
- Search for a flight from the home page
- Book a flight (add to DB)
- View and delete your reservations

## Authors
Student project by Mohamed Tadili
