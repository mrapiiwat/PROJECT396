const express = require("express");
const router = express.Router();
const pool = require("../Database/db");

router.get("/", async (req, res) => {
  try {
    const rides = await pool.query("SELECT * FROM ride");
    if (rides.rows.length === 0) {
      return res.json("NO RIDES AVAILABLE");
    }
    res.json(rides.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { passengerid, driverid, pickup_location, dropoff_location, price, status} = req.body;
    const now = new Date();
    const date = now.toLocaleDateString('th-TH', {
      timeZone: 'Asia/Bangkok',
    });
    const time = now.toLocaleTimeString('th-TH', {
      timeZone: 'Asia/Bangkok',
    });
    const PickupTime = `${date} ${time}`;
    const newRide = await pool.query(
      "INSERT INTO ride (passengerid, driverid, pickup_location, dropoff_location, pickup_time, price, status) VALUES($1, $2, $3, $4, $5, $6 ,$7) RETURNING *",
      [passengerid, driverid, pickup_location, dropoff_location,PickupTime, price, status]
    );
    res.json(newRide.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRide = await pool.query("DELETE FROM ride WHERE rideid = $1", [
      id,
    ]);
    res.json("Ride was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try{
    const checkStatus = await pool.query("SELECT status FROM ride WHERE rideid = $1", [id]);
    console.log(checkStatus.rows[0].status);
    if(checkStatus.rows[0].status === "Pending"){
      pool.query("UPDATE ride SET status = 'Confirmed' WHERE rideid = $1", [id]);
      return res.json("Ride was completed!");
      
    }else if(checkStatus.rows[0].status === "Confirmed"){
      pool.query("UPDATE ride SET status = 'Pending' WHERE rideid = $1", [id]);
      return res.json("Ride was Pending!");
    }
  }catch(err){
    console.error(err.message);
  };
});

module.exports = router;
