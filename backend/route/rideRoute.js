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
    const { passengerid, driverid, pickup_location, dropoff_location, price } = req.body;
    const status = "Pending";
    
    // กำหนด timezone และปรับรูปแบบวันที่/เวลา
    const now = new Date();
    const isoPickupTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
    ).toISOString().slice(0, 19).replace("T", " ");

    const newRide = await pool.query(
      `INSERT INTO ride 
       (passengerid, driverid, pickup_location, dropoff_location, pickup_time, price, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [passengerid, driverid, pickup_location, dropoff_location, isoPickupTime, price, status]
    );

    res.json(newRide.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
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
