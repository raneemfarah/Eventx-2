import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi"; 

const TopbarDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-md">
      <button
        onClick={() => navigate(-1)}
        className="text-gray-800 hover:text-gray-600 transition"
      >
        <FiArrowLeft className="w-6 h-6" />
      </button>
      <h2 className="text-2xl font-bold text-gray-800">Event Details</h2>
      <div className="w-6"></div>
    </div>
  );
};

export default TopbarDetails;
