import express from "express";
import dotenv from "dotenv";
dotenv.config();

const route = express.Router();
route.use(express.json());

const hostname = "https://test.api.amadeus.com";

const token = process.env.API_TOKEN;

route.get("", async (req, res) => {
  const {
    originLocationCode,
    destinationLocationCode,
    departureDate,
    returnDate,
    adults,
  } = req.query;

  const endpoint1 = `${hostname}/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    let data = await fetch(endpoint1, options);
    data = await data.json();
    res.end(JSON.stringify(data));
  } catch (e) {
    res.statusCode = 400;
    console.error(e);
    res.end("Error in the extraction of flights");
  }
});

export default route;
