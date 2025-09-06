import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-700 hover:text-gray-900 text-xl"
      >
        <FiArrowLeft className="mr-2" />
      </button>

      <h2 className="text-2xl font-bold text-gray-800">Add Event</h2>

      <div></div>
    </div>
  );
};

export default Topbar;
