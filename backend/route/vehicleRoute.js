const express = require("express");
const router = express.Router();
const pool = require("../Database/db");

router.get("/", async (req, res) => {
  try {
    const vehicles = await pool.query("SELECT * FROM vehicle");
    if (vehicles.rows.length === 0) {
      return res.json("NO VEHICLES AVAILABLE");
    }
    res.json(vehicles.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { vehicle_type, model, license_plate, driverid } = req.body;
    const vehicle_status = "AVAILABLE";
    const newVehicle = await pool.query(
      "INSERT INTO vehicle (vehicle_type, model, license_plate ,vehicle_status, driverid) VALUES($1, $2, $3, $4,$5) RETURNING *",
      [vehicle_type, model, license_plate, vehicle_status, driverid]
    );
    res.json(newVehicle.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteVehicle = await pool.query(
      "DELETE FROM vehicle WHERE vehicleid = $1",
      [id]
    );
    res.json("Vehicle was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const checkStatus = await pool.query(
      "SELECT vehicle_status FROM vehicle WHERE vehicleid = $1",
      [id]
    );
    const vehicleStatus = checkStatus.rows[0].vehicle_status
  
    if (vehicleStatus === "AVAILABLE") {
      const vehicle_status = "NOT AVAILABLE";
      const updateVehicle = await pool.query(
        "UPDATE vehicle SET vehicle_status = $1 WHERE vehicleid = $2",
        [vehicle_status, id]
      );
    } else if (vehicleStatus === "NOT AVAILABLE") {
      const vehicle_status = "AVAILABLE";
      const updateVehicle = await pool.query(
        "UPDATE vehicle SET vehicle_status = $1 WHERE vehicleid = $2",
        [vehicle_status, id]
      );
    }
    res.json("Vehicle status was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
