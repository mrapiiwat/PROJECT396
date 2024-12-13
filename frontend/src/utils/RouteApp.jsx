import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChooseUserType from "../Pages/ChooseUserType";
import RegisterDriver from "../Pages/RegisterDriver";
import RegisterPassenger from "../Pages/RegisterPassenger";
import Ride from "../Pages/Ride";
import RideHistory from "../Pages/RideHistory";
import ConfirmRide from "../Pages/ConfirmRide";
import Review from "../Pages/Review";



const RouteApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChooseUserType />} />
        <Route path="/registerdriver" element={<RegisterDriver />} />
        <Route path="/registerpass" element={<RegisterPassenger />} />
        <Route path="/ride" element={<Ride/>} />
        <Route path="/ConfirmRide" element={<ConfirmRide/>} />
        <Route path="/Review" element={<Review/>} />


      

        <Route path="/history" element={<RideHistory />} />
      </Routes>
    </Router>
  );
};

export default RouteApp;
