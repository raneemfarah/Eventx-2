import React from "react";
import { FiMapPin, FiEdit3, FiClock } from "react-icons/fi";

const EventInfoUser = ({ event }) => {
  if (!event) return <p>Loading details...</p>;

  const { name, venue, description, date, time } = event;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Event Name
          </label>
          <p className="px-3 py-2 bg-gray-50 border border-black rounded-lg text-gray-800">
            {name}
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Event Date
          </label>
          <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-black rounded-lg">
            <span className="text-gray-800">{date}</span>
            <FiEdit3 className="text-gray-600 ml-2" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Event Venue
          </label>
          <div className="flex items-center px-3 py-2 bg-gray-50 border border-black rounded-lg">
            <FiMapPin className="text-gray-500 mr-2" />
            <p className="text-gray-800">{venue}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Event Time
          </label>
          <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-black rounded-lg ">
            <span className="text-gray-800">{time}</span>
            <FiClock className="text-gray-600 ml-2" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Event Description
        </label>
        <p className="px-3 py-3 bg-gray-50 border border-black rounded-lg text-gray-800 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default EventInfoUser;
