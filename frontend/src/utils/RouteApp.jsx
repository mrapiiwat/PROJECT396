import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../Pages/Register";
import ChooseUserType from "../Pages/ChooseUserType";

const RouteApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChooseUserType />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default RouteApp;
