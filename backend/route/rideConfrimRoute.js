const express = require("express");
const router = express.Router();
const pool = require("../Database/db");

router.get("/", async (req, res) => {
  try {
    const rideconfirm = await pool.query("SELECT * FROM rideconfirmation");
    if (rideconfirm.rows.length === 0) {
      return res.json("NO RIDECONFIRM AVAILABLE");
    }
    res.json(rideconfirm.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { rideid, driverid, passengerid , confirmation_status } = req.body;
    const now = new Date();
    const date = now.toLocaleDateString('th-TH', {
      timeZone: 'Asia/Bangkok',
    });
    const time = now.toLocaleTimeString('th-TH', {
      timeZone: 'Asia/Bangkok',
    });
    const confirmation_time = `${date} ${time}`;
    const newRideConfirm = await pool.query(
      "INSERT INTO rideconfirmation (rideid, driverid, passengerid, confirmation_status , confirmation_time ) VALUES($1, $2, $3, $4 , $5) RETURNING *",
      [rideid, driverid, passengerid, confirmation_status , confirmation_time]
    );
    
    res.json(newRideConfirm.rows);
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM rideconfirmation WHERE confirmationid = $1", [id]);
    res.json("confirmationid was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const confirmation_status = await pool.query("SELECT * FROM rideconfirmation WHERE confirmationid = $1", [id]);
    const now = new Date();
    const date = now.toLocaleDateString('th-TH', {
      timeZone: 'Asia/Bangkok',
    });
    const time = now.toLocaleTimeString('th-TH', {
      timeZone: 'Asia/Bangkok',
    });
    const confirmation_time = `${date} ${time}`;
    if (confirmation_status.rows.length === 0) {
      return res.json("NO CONFIRMATION AVAILABLE");
    }else if(confirmation_status.rows[0].confirmation_status === "Confirmed"){
      await pool.query(
        "UPDATE rideconfirmation SET confirmation_status = 'Cancel' , confirmation_time = $1 WHERE confirmationid = $2",
        [confirmation_time , id]);
    }else if(confirmation_status.rows[0].confirmation_status === "Cancel"){
      await pool.query(
        "UPDATE rideconfirmation SET confirmation_status = 'Confirmed' , confirmation_time = $1 WHERE confirmationid = $2",
        [confirmation_time , id]);
    }
    res.json("confirmation was updated!");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;