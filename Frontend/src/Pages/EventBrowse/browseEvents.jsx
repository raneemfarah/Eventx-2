import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sections/sidebar";
import Topbar from "./Sections/topbar";
import EventCard from "./Sections/eventCard";
import api from "../../Services/api";

const BrowseEvents = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("");
  const [sortBy, setSortBy] = useState("none");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  let filteredEvents = events
    .filter((event) => event.name.toLowerCase().includes(search.toLowerCase()))
    .filter((event) => new Date(event.dateTime) >= new Date())
    .filter((event) => !event.isDraft);

  if (dateFilter) {
    filteredEvents = filteredEvents.filter(
      (event) =>
        new Date(event.dateTime).toDateString() === new Date(dateFilter).toDateString()
    );
  }

  if (sortBy === "popularity") {
    const order = { "High Popularity": 3, "Medium Popularity": 2, "Low Popularity": 1 };
    filteredEvents.sort((a, b) => order[a.popularity] - order[b.popularity]);
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <main className="p-4 sm:p-6 overflow-y-auto flex-1">
          <Topbar
            search={search}
            setSearch={setSearch}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <Routes>
            <Route
              index
              element={
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {loading ? (
                    <p>Loading events...</p>
                  ) : (
                    filteredEvents.map((event) => (
                      <EventCard key={event._id} event={event} />
                    ))
                  )}
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default BrowseEvents;
