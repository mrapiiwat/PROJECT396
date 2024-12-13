import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChooseUserType from "../Pages/ChooseUserType";
import RegisterDriver from "../Pages/RegisterDriver";
import RegisterPassenger from "../Pages/RegisterPassenger";
import Ride from "../Pages/Ride";



const RouteApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChooseUserType />} />
        <Route path="/registerdriver" element={<RegisterDriver />} />
        <Route path="/registerpass" element={<RegisterPassenger />} />
        <Route path="/ride" element={<Ride/>} />
      

      </Routes>
    </Router>
  );
};

export default RouteApp;
