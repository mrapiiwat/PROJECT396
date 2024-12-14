const express = require("express");
const router = express.Router();
const pool = require("../Database/db");

router.get("/", async (req, res) => {
  try {
    const allRideHistory = await pool.query("SELECT * FROM ridehistory");
    if (allRideHistory.rows.length === 0) {
      return res.status(400).send("No ride history found");
    }
    res.json(allRideHistory.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { rideid, pickup_location, dropoff_location, distance, price , ride_status , ride_rating , review , tip , discount_use } = req.body;
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0];
    const confirmation_time = `${date} ${time}`;
    const newRideHistory = await pool.query(
      "INSERT INTO ridehistory (rideid, date_time, pickup_location, dropoff_location, distance, price , ride_status , ride_rating , review , tip , discount_use) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [rideid, confirmation_time, pickup_location, dropoff_location, distance, price , ride_status , ride_rating , review , tip , discount_use]
    );
    res.json(newRideHistory.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRideHistory = await pool.query("DELETE FROM ridehistory WHERE ridehistoryid = $1", [id]);
    if (deleteRideHistory.rowCount === 0) {
      return res.status(400).send("No ride history found");
    }
    res.json("Ride history was successfully deleted");
  } catch (err) {
    console.error(err.message);
  }
});


router.get("/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const userforridID =  await pool.query("SELECT passengerid FROM passenger WHERE fname = $1", [user]);
    if (userforridID.rows.length === 0) {
      return res.status(400).send("No user found");
    }
    const rideForHisID = await pool.query("SELECT rideid FROM ride WHERE passengerid = $1", [userforridID.rows[0].passengerid]);
    if (rideForHisID.rows.length === 0) {
      return res.status(400).send("No ride found");
    }
    const allRideHistory = await pool.query("SELECT * FROM ridehistory where rideid = $1", [rideForHisID.rows[0].rideid]);
    res.json(allRideHistory.rows);
    
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;