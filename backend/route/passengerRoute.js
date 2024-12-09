const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const passengers = await pool.query("SELECT * FROM passenger");
    if (passengers.rows.length === 0) {
      return res.json("NO PASSENGERS AVAILABLE");
    }
    res.json(passengers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { fname, lname, phone_number } = req.body;
    const newPassenger = await pool.query(
      "INSERT INTO passenger (fname, lname, phone_number ) VALUES($1, $2, $3) RETURNING *",
      [fname, lname, phone_number]
    );
    res.json(newPassenger.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fname, lname, phone_number } = req.body;
    const updatePassenger = await pool.query(
      "UPDATE passenger SET fname = $1, lname = $2, phone_number = $3 WHERE passengerid = $4",
      [fname, lname, phone_number, id]
    );
    res.send("Passenger was updated!",+ updatePassenger.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePassenger = await pool.query("DELETE FROM passenger WHERE passengerid = $1", [id]);
    res.json("Passenger was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;