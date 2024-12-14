import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [tip, setTip] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [comment, setComment] = useState("");
  const location = useLocation();
  const [rideData, setRideData] = useState([]);
  const rideID = location.state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/ride/${rideID}`
        );
        setRideData(response.data);
        console.log(response.data);
        
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      }
    };
    fetchData();
  }, []);

  const reasons = [
    { id: 1, text: "คนขับมีน้ำใจ", icon: "🧳" },
    { id: 2, text: "อุปกรณ์เดินทางที่ดีเลิศ", icon: "🧭" },
    { id: 3, text: "สะอาดและสบายใจ", icon: "🧴" },
    { id: 4, text: "ยานพาหนะเจ๋งๆ", icon: "🚗" },
    { id: 5, text: "ตรงเวลา", icon: "⏱️" },
    { id: 6, text: "พูดจาสุภาพ", icon: "🙋" },
    { id: 7, text: "ความปลอดภัยดี", icon: "🛡️" },
    { id: 8, text: "เส้นทางดี", icon: "📍" },
  ];

  const ratingText = ["แย่มาก", "ไม่ดี", "ปานกลาง", "ดี", "ดีมาก"];

  const handleClose = () => {
    alert("คุณกดปุ่มปิด!");
  };

  const handleSubmit = async () => {
    try {
      const saveHistory = await axios.post(
        "http://localhost:5000/ridehistory",
        {
          rideid: rideID,
          pickup_location: rideData.pickup_location,
          dropoff_location: rideData.dropoff_location,
          distance: 10,
          price: rideData.price,
          ride_status: "COMPLETED",
          ride_rating: 5,
          review: `${selectedReason} : ${comment} `,
          tip: tip,
          discount_use: null,
        }
      );
      alert(
        `Rating: ${rating} ดาว (${
          ratingText[rating - 1]
        })\nTip: ${tip} ฿\nเหตุผล: ${selectedReason}\nความคิดเห็นเพิ่มเติม: ${comment}`
      );
    } catch (error) {
      alert(error.massge);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button onClick={handleClose} className="text-xl">
          ✖️
        </button>
        <h1 className="text-3xl font-bold">
          {rating > 0 ? ratingText[rating - 1] : "ให้คะแนน"}
        </h1>
        <div></div>
      </div>

      {/* Stars */}
      <div className="flex justify-center mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-6xl ${
              rating >= star ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Tip Options */}
      <div className="mt-4">
        <p className="text-center text-gray-600">
          ให้ทิปคนขับแทนคำขอบคุณ คนขับจะได้ทิปเต็มจำนวน 100%
        </p>
        <div className="flex justify-center gap-4 mt-4">
          {[20, 50, 70].map((amount) => (
            <button
              key={amount}
              onClick={() => setTip(amount)}
              className={`w-28 px-4 py-2 border rounded-md ${
                tip === amount ? "bg-green-500 text-white" : "bg-gray-100"
              }`}
            >
              ฿{amount}
            </button>
          ))}
          <input
            type="number"
            placeholder="ระบุจำนวนเงิน"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            className="w-40 px-6 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Reasons */}
      <div className="mt-6">
        <p className="text-center text-gray-600">
          เพลิดเพลินกับการเดินทางหรือไม่ บอกคนขับของคุณเลย
        </p>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {reasons.map((reason) => (
            <button
              key={reason.id}
              onClick={() => setSelectedReason(reason.text)}
              className={`flex flex-col items-center p-4 border rounded-md ${
                selectedReason === reason.text
                  ? "bg-green-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <span className="text-2xl">{reason.icon}</span>
              <span className="text-sm">{reason.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Comment */}
      <div className="mt-6">
        <textarea
          placeholder="แบ่งปันคำชมของคุณเลย"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="mt-24 flex justify-center">
        <button
          onClick={handleSubmit}
          className="w-[300px] mx-auto bg-green-500 text-white py-3 rounded-md font-bold text-lg"
        >
          ส่ง
        </button>
      </div>
    </div>
  );
};

export default Review;
