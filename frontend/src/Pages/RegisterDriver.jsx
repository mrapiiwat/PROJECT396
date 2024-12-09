import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DriverRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone_number: "",
    driving_license: "",
    license_plate: "",
    model: "",
    cartype: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `สมัครเรียบร้อยสำหรับคนขับ:\nข้อมูล: ${JSON.stringify(formData, null, 2)}`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-driver">สมัครคนขับ</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-80"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">ชื่อ</label>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-driver"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">นามสกุล</label>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-driver"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">เบอร์โทร</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-driver"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            หมายเลขใบขับขี่
          </label>
          <input
            type="text"
            name="driving_license"
            value={formData.driving_license}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-driver"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            ป้ายทะเบียนรถ
          </label>
          <input
            type="text"
            name="license_plate"
            value={formData.license_plate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-driver"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            ยี่ห้อ/รุ่นรถ
          </label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-driver"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">ประเภทของรถ</label>
          <select
            name="carType"
            value={formData.carType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-driver"
          >
            <option value="">เลือกประเภท</option>
            <option value="Taxi">Taxi</option>
            <option value="Motorbike">Motorbike</option>
            <option value="Ecar">Ecar</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-driver text-white py-2 rounded-lg hover:bg-driver-hover"
        >
          สมัคร
        </button>
      </form>
    </div>
  );
};

export default DriverRegister;
