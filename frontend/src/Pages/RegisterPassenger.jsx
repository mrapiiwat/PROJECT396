import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PassengerRegister = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phone_number: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`สมัครเรียบร้อยสำหรับผู้โดยสาร:\nข้อมูล: ${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-passenger">สมัครผู้โดยสาร</h1>
      <form className="bg-white p-6 rounded-lg shadow-lg w-80" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">ชื่อ</label>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-passenger"
            
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">นามสกุล</label>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-passenger"
           
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">เบอร์โทร</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-passenger"
            
          />
        </div>
        <button
          type="submit"
          className="w-full bg-passenger text-white py-2 rounded-lg hover:bg-passenger-hover"
        >
          สมัคร
        </button>
        <a onClick={() => navigate("/")}
      
          className="w-full bg-passenger text-white py-2 rounded-lg mt-2 hover:bg-passenger-hover"
        >
          ย้อนกลับ
        </a>
      </form>
      
    </div>
  );
};

export default PassengerRegister;