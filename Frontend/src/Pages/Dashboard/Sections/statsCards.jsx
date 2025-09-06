import { useEffect, useState } from "react";
import axios from "axios";

export default function StatsCards() {
  const [upcomingEventsCount, setUpcomingEventsCount] = useState(0);

  useEffect(() => {
axios.get("http://localhost:5000/api/events")
      .then(res => {
        let eventsArray = Array.isArray(res.data) ? res.data : [];
        const now = new Date();
        eventsArray = eventsArray.filter(e => e.isDraft === false).filter(e => new Date(e.dateTime) >= now);

        setUpcomingEventsCount(eventsArray.length);
      })
      .catch(err => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-blue-500 font-bold">Events</p>
        <h2 className="text-2xl font-bold">{upcomingEventsCount} Events</h2>
      </div>

      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-yellow-500 font-bold">Bookings</p>
        <h2 className="text-2xl font-bold">2,7598</h2>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-green-500 font-bold">Revenue</p>
        <h2 className="text-2xl font-bold">623,500 LKR</h2>
      </div>
    </div>
  );
}
