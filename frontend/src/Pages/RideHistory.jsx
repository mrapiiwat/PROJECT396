import React, { useState } from "react";
import axios from "axios";

const RideHistory = () => {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState("");

  const handleClicked = async () => {
    try {
      if (user === "") {
        return;
      }
      const response = await axios.get(
        `http://localhost:5000/ridehistory/${user}`
      );
      if (response.data.length === 0) {
        setHistory([]);
      }
      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="text-3xl text-center font-extrabold my-10">
        ประวัติการเดินทาง
      </h1>
      <div className="w-full flex justify-center mt-2">
        <input
          className="border p-2 w-96"
          type="text"
          placeholder="What is your name..."
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <button
          onClick={handleClicked}
          className="bg-blue-500 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>
      <div className="w-full">
        {history.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4 mt-5">
            {history.map((item, index) => (
              <div key={index} className="border p-4 w-full sm:w-1/2 lg:w-1/3">
                <p>ID การเดินทาง: {item.rideid}</p>
                <p>วันเวลา: {item.date_time}</p>
                <p>ขึ้นที่: {item.pickup_location}</p>
                <p>จุดหมาย: {item.dropoff_location}</p>
                <p>ระยะทาง: {item.distance}</p>
                <p>ราคา: {item.price}</p>
                <p>สถานะ: {item.ride_status}</p>
                <p>คะแนน: {item.ride_rating}</p>
                <p>รีวิว: {item.review}</p>
                <p>ทิป: {item.tip}</p>
                <p>โค้ดที่ใช้: {item.discount_use}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-8">
            <p className="text-gray-500">ไม่มีข้อมูลการเดินทาง</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideHistory;
