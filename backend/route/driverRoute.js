const express = require("express");
const router = express.Router();
const pool = require("../Database/db");

router.get("/", async (req, res) => {
  try {
    const drivers = await pool.query("SELECT * FROM driver");
    if (drivers.rows.length === 0) {
      return res.json("NO DRIVERS AVAILABLE");
    }
    res.json(drivers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { fname, lname, phone_number, driving_license } = req.body;
    const newDriver = await pool.query(
      "INSERT INTO driver (fname, lname, phone_number , driving_license) VALUES($1, $2, $3 ,$4) RETURNING *",
      [fname, lname, phone_number, driving_license]
    );
    res.status(201).json({driverid : newDriver.rows[0].driverid});
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDriver = await pool.query("DELETE FROM driver WHERE driverid = $1", [id]);
    res.json("Driver was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
