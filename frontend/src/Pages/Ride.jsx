import React, { useState } from "react";
import ride from "../../public/ride.png";

const Ride = () => {
  const [username, setUsername] = useState("");
  const [isUsernameConfirmed, setIsUsernameConfirmed] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedCarBrand, setSelectedCarBrand] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const carBrands = [
    { name: "Taxi", emoji: "🚖" },
    { name: "Motorbike", emoji: "🛵" },
    { name: "Economy", emoji: "🚗" },
  ];

  const paymentMethods = ["เงินสด", "บัตรเครดิต", "พร้อมเพย์"];

  const handleConfirmUsername = () => {
    if (username.trim() === "") {
      alert("กรุณากรอกชื่อผู้ใช้ก่อน!");
    } else {
      setIsUsernameConfirmed(true);
    }
  };

  const handleConfirm = () => {
    if (!origin.trim()) {
      alert("กรุณากรอกสถานที่ต้นทาง!");
      return;
    }
    if (!destination.trim()) {
      alert("กรุณากรอกสถานที่ปลายทาง!");
      return;
    }
    if (!selectedCarBrand) {
      alert("กรุณาเลือกประเภทรถก่อนยืนยัน");
      return;
    }
    if (!paymentMethod) {
      alert("กรุณาเลือกวิธีการจ่ายเงินก่อนยืนยัน");
      return;
    }
    alert(
      `ชื่อผู้ใช้: ${username}\nต้นทาง: ${origin}\nปลายทาง: ${destination}\nคุณได้เลือกประเภทรถ: ${selectedCarBrand}\nวิธีจ่ายเงิน: ${paymentMethod}`
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* รูปภาพที่เกี่ยวกับการเดินทาง */}
      <div className="relative w-full h-45 bg-gray-200">
        <img
          src={ride}
          alt="Travel"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent text-white text-center py-2">
          <h1 className="text-xl font-bold">การเดินทางที่ดีที่สุดสำหรับคุณ</h1>
        </div>
      </div>

      {/* ส่วนกรอกชื่อ */}
      <div className="flex-1 p-4 space-y-6">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-2">กรอกชื่อผู้ใช้</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ใส่ชื่อผู้ใช้ของคุณ..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleConfirmUsername}
              className="bg-green-500 text-white px-4 py-2 rounded-md font-bold"
            >
              ตกลง
            </button>
          </div>
        </div>

        {/* ส่วนการเลือกต้นทางและปลายทาง */}
        {isUsernameConfirmed && (
          <div className="bg-white p-4 shadow-md rounded-lg space-y-4">
            <div className="flex flex-col space-y-4">
              {/* ต้นทาง */}
              <div className="flex items-center space-x-4">
                <span className="text-xl">📍</span>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="ตำแหน่งของคุณ..."
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* ปลายทาง */}
              <div className="flex items-center space-x-4">
                <span className="text-xl">📍</span>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="เลือกจุดหมายปลายทาง..."
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ส่วนการเลือกประเภทรถ */}
        {isUsernameConfirmed && (
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-bold mb-2">เลือกประเภทรถ</h2>
            <div className="flex gap-4">
              {carBrands.map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => setSelectedCarBrand(brand.name)}
                  className={`flex flex-col items-center px-4 py-2 rounded-md border ${
                    selectedCarBrand === brand.name
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <span className="text-2xl">{brand.emoji}</span>
                  <span>{brand.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ส่วนการเลือกวิธีการจ่ายเงิน */}
        {isUsernameConfirmed && (
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-bold mb-2 inline-block">เลือกวิธีการจ่ายเงิน</h2>
            <div className="flex gap-4 flex-wrap">
              {paymentMethods.map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`px-4 py-2 rounded-md border ${
                    paymentMethod === method
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Confirm Button */}
      {isUsernameConfirmed && (
        <div className="bg-white p-4">
          <button
            onClick={handleConfirm}
            className="w-3/4 bg-green-500 text-white px-4 py-2 rounded-md font-bold mx-auto block"
          >
            ยืนยัน
          </button>
        </div>
      )}
    </div>
  );
};

export default Ride;