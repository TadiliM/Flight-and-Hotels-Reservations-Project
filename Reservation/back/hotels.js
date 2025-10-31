import express from "express";
import dotenv from "dotenv";
dotenv.config();

const route = express.Router();
route.use(express.json());

const token = process.env.API_TOKEN;

const hostname = "https://test.api.amadeus.com";

// Usage : /hotels?cityCode=...
route.get("", async (req, res) => {
  const { cityCode } = req.query;

  const endpoint1 = `${hostname}/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(endpoint1, options);
    //if (!response.ok) throw new Error("Not found data\n");
    const data = await response.json();
    const hotels = data.data;

    // Filtration of the data
    const hotelsFiltred = hotels.map((hotel) => {
      return { name: hotel.name, address: hotel.address };
    });

    console.log(data);
    res.status(200).end(JSON.stringify(hotels));
  } catch (e) {
    res.status(400);
    console.error(e);
    res.end("Error in the extraction of hotels\n.");
  }
});

export default route;

/**
 * Maybe we can add a new functionality to the web site to search rooms in the selectionned hotels
 * 
 * 
// Usage : /api/hotels?cityCode=...&adults=...&checkInDate=...&checkOutDate=...&roomQuantity=...&priceRange=...
route.get("/api/hotels", async (req, res) => {
  res.statusCode = 200;

  const {
    cityCode,
    adults,
    checkInDate,
    checkOutDate,
    roomQuantity,
    priceRange,
  } = req.params;

  const endpoint1 = `${hostname}/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`;

  try {
    const data = await fetch(endpoint1)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.error(e);
      });
    const hotelsIds = data.map((hotel) => {
      return hotelId;
    });
  } catch (e) {
    res.statusCode = 400;
    console.error(e);
    res.end("Error in the extraction of hotels");
  }
  const endpoint2 = `${hostname}/v2/shopping/hotel-offers?hotelIds=${hotelsIds}&adults=${adults}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomQuantity=${roomQuatity}&priceRange=${priceRange}`;
  try {
    const hotels = await fetch(endpoint2).then((response) => )
  } catch (e) {
    res.statusCode = 400;
    console.error(e);
    res.end("Error in the extraction of hotels");
  }
});
 */
