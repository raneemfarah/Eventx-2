import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {axios.get("http://localhost:5000/api/events").then(res => {
        let eventsArray = Array.isArray(res.data) ? res.data : [];
        const now = new Date();
        eventsArray = eventsArray
          .filter(e => e.isDraft === false)
          .filter(e => new Date(e.dateTime) >= now).sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
        setEvents(eventsArray);
        setLoading(false);}).catch(err => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);
  if (events.length === 0) return <p>No events found</p>;
  return (
    <div>
      <h2 className="font-bold mb-2">Upcoming Events</h2>
      <ul className="space-y-2">
        {events.map((event) => (
          <li
            key={event._id}
            className="p-2 border rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => navigate(`/events/${event._id}`)} 
          >
            <b>{event.name}</b> <br />
            <span className="text-sm text-gray-600">
              {new Date(event.dateTime).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
