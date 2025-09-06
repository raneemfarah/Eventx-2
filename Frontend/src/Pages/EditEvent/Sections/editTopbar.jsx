import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const Edittopbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-transparent p-4 rounded-lg">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-700 hover:text-gray-900 font-medium"
      >
        <FiArrowLeft className="w-5 h-5" />
      </button>

      <h2 className="text-xl font-bold text-gray-800">Edit Event</h2>

      <div className="w-16" />
    </div>
  );
};

export default Edittopbar;
