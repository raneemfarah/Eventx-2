import React from "react";
import { FiMapPin } from "react-icons/fi";

const EventInfo = ({name,setName,venue,setVenue,description,setDescription,date,setDate,time,setTime,}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Event Name
        </label>
        <input
          type="text"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter event name"
          className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Event Venue
        </label>
        <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
          <FiMapPin className="text-gray-500 mr-2" />
          <input
            type="text"
            value={venue || ""}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="Enter venue"
            className="w-full bg-gray-50 text-gray-800 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Event Date
          </label>
          <input
            type="date"
            value={date || ""}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-800 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Event Time
          </label>
          <input
            type="time"
            value={time || ""}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-800 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Event Description
        </label>
        <textarea
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          rows={4}
          className="w-full border rounded-lg px-3 py-3 bg-gray-50 text-gray-800 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
    </div>
  );
};

export default EventInfo;