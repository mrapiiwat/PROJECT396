import React from "react";
import {  useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = (role) => {
    alert(`คุณเลือก: ${role}`);
    if (role == "ผู้โดยสาร") {
      navigate("/registerpass");
    } else if (role == "คนขับ") {
      navigate("/registerdriver");
    } else if (role == "เรียกรถ") {
      navigate("/ride");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div
        className="bg-white text-center p-6 m-4 w-48 rounded-lg shadow-lg hover:bg-primary hover:text-white cursor-pointer"
        onClick={() => handleClick("ผู้โดยสาร")}
      >
        ผู้โดยสาร
      </div>
      <div
        className="bg-white text-center p-6 m-4 w-48 rounded-lg shadow-lg hover:bg-secondary hover:text-white cursor-pointer"
        onClick={() => handleClick("คนขับ")}
      >
        คนขับ
      </div>
      <div
        className="bg-white text-center p-6 m-4 w-48 rounded-lg shadow-lg hover:bg-primary hover:text-white cursor-pointer"
        onClick={() => handleClick("เรียกรถ")}
      >
        เรียกรถ
      </div>
    </div>
  );
};

export default HomePage;
