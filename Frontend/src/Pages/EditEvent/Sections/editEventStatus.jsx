import React from "react";
import { FiDollarSign, FiUsers, FiCheck, FiTrendingUp } from "react-icons/fi";

const EditEventStatus = ({ eventData, setEventData }) => {
  if (!eventData) return <p>Loading...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  return (
    <div className="p-6 rounded-lg mb-6">
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Ticket Price
        </label>
        <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
          <FiDollarSign className="text-gray-500 mr-2" />
          <input
            type="text"
            name="ticketPrice"
            value={eventData.ticketPrice || ""}
            onChange={handleChange}
            className="w-full bg-gray-50 outline-none text-gray-800"
            placeholder="Enter ticket price"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Seat Amount
        </label>
        <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
          <FiUsers className="text-gray-500 mr-2" />
          <input
            type="text"
            name="totalSeats"
            value={eventData.totalSeats || ""}
            onChange={handleChange}
            className="w-full bg-gray-50 outline-none text-gray-800"
            placeholder="Enter total seats"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Available Seats
        </label>
        <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
          <FiCheck className="text-gray-500 mr-2" />
          <input
            type="text"
            name="availableSeats"
            value={eventData.availableSeats || ""}
            onChange={handleChange}
            className="w-full bg-gray-50 outline-none text-gray-800"
            placeholder="Enter available seats"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Popularity
        </label>
        <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
          <FiTrendingUp className="text-gray-500 mr-2" />
          <select
            name="popularity"
            value={eventData.popularity || ""}
            onChange={handleChange}
            className="w-full bg-gray-50 outline-none text-gray-800"
          >
            <option value="">Select popularity</option>
            <option value="High Popularity">High Popularity</option>
            <option value="Medium Popularity">Medium Popularity</option>
            <option value="Low Popularity">Low Popularity</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default EditEventStatus;
