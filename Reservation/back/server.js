import express from "express";
import routeHotels from "./hotels.js";
import routeFlights from "./flights.js";
import routeReservations from './reservations.js';

const app = express();
app.use(express.json());



app.use("/hotels", routeHotels);

app.use("/flights", routeFlights);

app.use("/reservations", routeReservations);

app.get("/about", (req, res) => {
  res.status(200).json("mon site\n");
});

// The rest of the web pages
app.use((req, res) => {
  res.status(404).json("Page Not Found\n");
});


// Error cases
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json("Something went wrong : ");
});

app.listen(3000, () => {
  console.log("\n-----------| Serveur launched |-----------\n");
});
