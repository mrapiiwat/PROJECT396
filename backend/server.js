const express = require("express");
const cors = require("cors");
const driverRoute = require("./route/driverRoute");
const passengerRoute = require("./route/passengerRoute");
const vehicleRoute = require("./route/vehicleRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use('/driver' , driverRoute)
app.use('/passenger' , passengerRoute)
app.use('/vehicle' , vehicleRoute)

PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

