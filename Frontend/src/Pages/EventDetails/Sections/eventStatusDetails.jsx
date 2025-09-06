import React from "react";
import { FiDollarSign, FiUsers, FiCheck, FiTrendingUp } from "react-icons/fi";

const EventStatusDetails = ({ event }) => {
  if (!event) return <p>Loading status details...</p>;

  const { ticketPrice, totalSeats, availableSeats, popularity } = event;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Ticket Price
          </label>
          <div className="flex items-center justify-between border border-black rounded-lg px-3 py-2 bg-gray-50">
            <span className="flex items-center text-gray-800">
              <FiDollarSign className="text-gray-600 mr-2" />
              {ticketPrice} LKR
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Seat Amount
          </label>
          <div className="flex items-center justify-between border border-black rounded-lg px-3 py-2 bg-gray-50">
            <span className="flex items-center text-gray-800">
              <FiUsers className="text-gray-600 mr-2" />
              {totalSeats}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Available Seats
          </label>
          <div className="flex items-center justify-between border border-black rounded-lg px-3 py-2 bg-gray-50">
            <span className="flex items-center text-gray-800">
              <FiCheck className="text-gray-600 mr-2" />
              {availableSeats}
            </span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Popularity
          </label>
          <div className="flex items-center justify-between border border-black rounded-lg px-3 py-2 bg-gray-50">
            <span className="flex items-center text-gray-800">
              <FiTrendingUp className="text-gray-600 mr-2" />
              {popularity || "Not specified"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventStatusDetails;
