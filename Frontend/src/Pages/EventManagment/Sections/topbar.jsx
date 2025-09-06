import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaChevronDown, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Topbar = ({ events, setFilteredEvents }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Status");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const handleFilter = () => {
    let filtered = [...events];
    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (date) {
      const selectedDate = new Date(date);
      filtered = filtered.filter(
        (event) =>
          event.dateTime &&
          new Date(event.dateTime).toDateString() === selectedDate.toDateString()
      );
    }

    if (sortBy === "Popularity") {
      const order = {"High Popularity": 3, "Medium Popularity": 2, "Low Popularity": 1,};
      filtered.sort((a, b) => (order[b.popularity] || 0) - (order[a.popularity] || 0));
    }

    setFilteredEvents(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [searchTerm, sortBy, date]);

  return (
    <div className="flex flex-col gap-3 p-4 bg-white border-b max-w-[1000px] mx-auto">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2 w-1/2">
          <h2 className="text-xl font-bold">Event Management Section</h2>
          <div className="flex flex-wrap gap-3">
            <button
              className="px-4 py-2 border border-[#0122F5] text-[#0122F5] rounded-lg hover:bg-[#0122F5] hover:text-white transition flex items-center gap-1"
              onClick={() => navigate("/add-event")}
            >
              + New Event
            </button>

            <button className="px-4 py-2 border border-[#FA921B] text-[#FA921B] rounded-lg hover:bg-[#FA921B] hover:text-white transition flex items-center gap-1">
              Attendee Insights
              <FaChevronDown className="text-sm" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-1/2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-3 py-2 rounded-lg pl-8 w-full focus:outline-none"
            />
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex flex-wrap gap-3 mt-1">
            <div className="flex items-center border px-3 py-2 rounded-lg gap-2">
              <label htmlFor="sort">Sort By:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="outline-none"
              >
                <option value="Status">Status</option>
                <option value="Popularity">Popularity</option>
              </select>
            </div>

            <div className="flex items-center border px-3 py-2 rounded-lg gap-2">
              <FaCalendarAlt className="text-gray-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
