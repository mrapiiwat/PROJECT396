const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use('/driver' , require('./route/driverRoute'))
app.use('/passenger' , require('./route/passengerRoute'))
app.use('/vehicle' , require('./route/vehicleRoute')) 
app.use('/ride' ,require('./route/rideRoute'));
app.use('/rideconfirm' , require('./route/rideConfrimRoute'));
app.use('/discount' , require('./route/discountRoute'));
app.use('/ridehistory' , require('./route/rideHistoryRoute'));
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
}); // 404 page

PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

