import React, { useState, useEffect, useContext } from "react";
import Topbar from "./Sections/topbar";
import EventTabs from "./Sections/tabs";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Contexts/authContext"; 

const EventManagment = () => {
  const { id } = useParams(); 
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]); 

  const { user } = useContext(AuthContext); 
  
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data); 
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json(); 
      if (!res.ok) throw new Error(data.message || "Failed to delete event");

      setEvents(prev => prev.filter(e => e._id !== eventId));
      setFilteredEvents(prev => prev.filter(e => e._id !== eventId));
      console.log(data.message);
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const now = new Date();
  const upcomingEvents = filteredEvents.filter(
    (e) => e.dateTime && new Date(e.dateTime) >= now && !e.isDraft
  );
  const pendingEvents = filteredEvents.filter((e) => e.isDraft);
  const closedEvents = filteredEvents.filter(
    (e) => e.dateTime && new Date(e.dateTime) < now
  );

  return (
    <div className="p-6">
      <Topbar setFilteredEvents={setFilteredEvents} events={events} />

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-blue-600 mb-4 text-center">
            Upcoming Events
          </h2>
          <EventTabs events={upcomingEvents} onDelete={handleDelete} />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-green-600 mb-4 text-center">
            Pending Events
          </h2>
          <EventTabs events={pendingEvents} onDelete={handleDelete} />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-red-600 mb-4 text-center">
            Closed Events
          </h2>
          <EventTabs events={closedEvents} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default EventManagment;
