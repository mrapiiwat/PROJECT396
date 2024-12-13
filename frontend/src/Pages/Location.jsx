import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";

const Location = () => {
  const containerStyle = {
    width: "100%",
    height: "70vh", // ความสูงของแผนที่
  };

  const center = {
    lat: 13.7563, // Latitude (กรุงเทพฯ)
    lng: 100.5018, // Longitude
  };

  const [origin, setOrigin] = useState(""); // ต้นทาง
  const [destination, setDestination] = useState(""); // ปลายทาง

  const handleSelectOrigin = (place) => {
    setOrigin(place.formatted_address);
  };

  const handleSelectDestination = (place) => {
    setDestination(place.formatted_address);
  };

  const handleSubmit = () => {
    if (origin && destination) {
      alert(`ต้นทาง: ${origin}\nปลายทาง: ${destination}`);
    } else {
      alert("กรุณาเลือกสถานที่ต้นทางและปลายทาง");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-md">
        <button className="text-gray-600">
          <span className="material-icons">menu</span>
        </button>
        <h1 className="text-lg font-bold text-gray-800">แผนที่</h1>
        <div></div>
      </div>

      {/* Google Map */}
      <LoadScript googleMapsApiKey="AIzaSyBzP7EDnFTiON-eN2IsAn_mPrzU1CnuplE">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        />
      </LoadScript>

      {/* Form สำหรับต้นทางและปลายทาง */}
      <div className="bg-white rounded-t-2xl shadow-lg p-4 mt-auto">
        <h2 className="text-sm font-bold mb-2">เลือกต้นทางและปลายทาง</h2>
        <div className="mb-4">
          <Autocomplete
            apiKey="YOUR_GOOGLE_MAPS_API_KEY"
            onPlaceSelected={(place) => handleSelectOrigin(place)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="เลือกสถานที่ต้นทาง"
          />
        </div>
        <div className="mb-4">
          <Autocomplete
            apiKey="YOUR_GOOGLE_MAPS_API_KEY"
            onPlaceSelected={(place) => handleSelectDestination(place)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="เลือกสถานที่ปลายทาง"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          ค้นหาเส้นทาง
        </button>
      </div>
    </div>
  );
};

export default Location;
