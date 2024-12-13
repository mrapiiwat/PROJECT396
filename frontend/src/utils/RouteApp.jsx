import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChooseUserType from "../Pages/ChooseUserType";
import RegisterDriver from "../Pages/RegisterDriver";
import RegisterPassenger from "../Pages/RegisterPassenger";
import MapAndOptions from "../Pages/MapAndOptions";
import RideOptions from "../Pages/RideOptions";



const RouteApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChooseUserType />} />
        <Route path="/registerdriver" element={<RegisterDriver />} />
        <Route path="/registerpass" element={<RegisterPassenger />} />
        <Route path="/mapAndOptions" element={<MapAndOptions />} />
        <Route path="/rideOptions" element={<RideOptions />} />

      </Routes>
    </Router>
  );
};

export default RouteApp;
