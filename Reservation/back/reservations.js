import express from "express";
import pg, { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const route = express.Router();
route.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on("error", (err) => {
  console.error("Error Database :" + err);
});

console.log("connected1");

route.get("", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM reservation");
    res.status(200).json(rows);
    console.log("connected");
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

route.post("", async (req, res) => {
  try {
    const { hotel, flight } = req.body;
    const rows = await pool.query(
      "INSERT INTO reservation (hotel, flight) VALUES ( $1, $2)",
      [hotel, flight]
    );
    console.log("Registration added\n");
    res.status(201).send({ hotel, flight });
  } catch (error) {
    console.error("error in add registration", error);
    res.status(500).json({ error: "Error adding reservation" });
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const rows = await pool.query("DELETE FROM reservation WHERE id = $1", [id]);
    console.log("Registration deleted\n");
    res.status(201).send(id);
  } catch (error) {
    console.error("error in delete registration", error);
    res.status(500).json({ error: "Error delete reservation\n" });
  }
});

export default route;
