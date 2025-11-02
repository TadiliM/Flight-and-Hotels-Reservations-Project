import express from "express";
import dotenv from "dotenv";
dotenv.config();

const route = express.Router();
route.use(express.json());

const hostname = "https://test.api.amadeus.com";

// Get an access_token
async function getAccessToken() {
  const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.API_KEY,
      client_secret: process.env.API_SECRET,
    }),
  });

  const data = await response.json();
  return data.access_token;
}


const token = await getAccessToken();

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
    console.log("api amadeus : ",data);
    res.end(JSON.stringify(data));
  } catch (e) {
    res.statusCode = 400;
    console.error(e);
    res.end("Error in the extraction of flights");
  }
});

export default route;
