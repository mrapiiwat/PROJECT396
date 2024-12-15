import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import photo1 from "../../public/photo1.jpg";
import cover from "../../public/cover.png";
import axios from "axios";

const ConfirmRide = () => {
  const navigate = useNavigate();
  const [eta, setEta] = useState(0); // Estimated time of arrival
  const [driver, setDriver] = useState({});
  const [drivers, setDrivers] = useState({});
  const [cars, setCars] = useState({});
  const [car, setCar] = useState({});
  const [price, setPrice] = useState(0); // Random price
  const [user, setUser] = useState({});
  const [rideData , setRideData] = useState({});
  const location = useLocation();
  const rideID = location.state;
  useEffect(() => {
    axios
      .get(`http://localhost:5000/ride/${rideID}`)
      .then((response) => {
        setRideData(response.data);
        const { passengerid } = response.data;
        setUser(passengerid);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/driver")
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/vehicle")
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Randomize price (50-200 baht)
    setPrice(Math.floor(Math.random() * (200 - 50 + 1)) + 50);
  }, []);

  useEffect(() => {
    // Randomize ETA (2-10 minutes)
    setEta(Math.floor(Math.random() * (10 - 2 + 1)) + 2);

    // Randomize driver
    if (drivers.length > 0) {
      const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
      setDriver(randomDriver);
    }

    if (cars.length > 0) {
      const randomCar = cars[Math.floor(Math.random() * cars.length)];
      setCar(randomCar);
    }
  }, [drivers, cars]);

  const handleArrived = async () => {
    try {
      navigate("/review", { state: rideID });
      await axios.put(`http://localhost:5000/ride/con/${driver.driverid}`, {
        driverid: driver.driverid,
        price: price,
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Map Section */}
      <div className="relative h-1/2 bg-white border-b-black flex items-center justify-center">
        <img
          className="w-full h-full object-contain lg:object-center"
          src={cover}
          alt=""
        />
      </div>

      {/* Ride Details */}
      <div className="bg-white p-6 shadow-md rounded-t-3xl -mt-6 flex flex-col flex-grow pt-12">
        <div className="flex justify-between items-center mb-4">
          <div className="mx-32">
            <p className="text-2xl font-bold mb-1">มาถึงใน {eta} นาที</p>
            <p className="text-gray-600 text-lg">
              {car.model} | <strong>{car.license_plate}</strong>
            </p>
          </div>
          <p className="text-2xl font-bold text-green-500 mx-32">{price} ฿</p>
        </div>

        {/* Driver and Actions */}
        <div className="flex items-center justify-between mt-4 mx-32">
          <div className="flex items-center space-x-4">
            <img
              src={photo1}
              alt="Driver"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <p className="font-bold text-xl">
                {driver.lname} {driver.fname}
              </p>
              <p className="text-sm text-gray-600">คนขับรถ</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Chat Button */}
            <button className="flex flex-col items-center mr-24">
              <span className="bg-gray-200 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
              </span>
              <p className="text-sm text-gray-600">แชท</p>
            </button>

            {/* Call Button */}
            <button className="flex flex-col items-center">
              <span className="bg-gray-200 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
                  />
                </svg>
              </span>
              <p className="text-sm text-gray-600">โทร</p>
            </button>
          </div>
        </div>

        {/* Arrived Button */}
        <div className="mt-20 flex justify-center ">
          <button
            onClick={handleArrived}
            className="w-[300px] mx-auto bg-green-500 text-white py-3 rounded-md font-bold text-lg"
          >
            ถึงแล้ว
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRide;
