import { useEffect, useState } from "react";
import axios from "axios";

export default function LatestEvent() {
  const [event, setEvent] = useState(null);

  useEffect(() => {axios.get("http://localhost:5000/api/events").then(res => {
        let eventsArray = Array.isArray(res.data) ? res.data : [];
        eventsArray = eventsArray.filter(e => e.isDraft === false);
        if (eventsArray.length === 0) return;
        const latest = eventsArray.reduce((prev, curr) => {
          return new Date(curr.dateTime) > new Date(prev.dateTime) ? curr : prev;
        }, eventsArray[0]);
        setEvent(latest);
      })
      .catch(err => {
        console.error("error", err);
      });
  }, []);

  if (!event) return null;

  const getSeatColor = (status) => {
    switch (status) {
      case "Available Seats": return "bg-gray-300";
      case "Reserved Seats": return "bg-purple-200";
      case "Paid": return "bg-purple-500";
      default: return "bg-gray-300";
    }
  };

  return (
    <div>
      <h2 className="font-bold mb-2">Latest Event</h2>
      <p><b>Event Name:</b> {event.name}</p>
      <p><b>Date:</b> {new Date(event.dateTime).toLocaleDateString()}</p>

      <div className="mt-4 grid grid-cols-6 gap-2">
        {event.seatAllocation.map((seat) => (
          <div
            key={seat._id}
            className={`h-6 w-6 rounded ${getSeatColor(seat.status)}`}
            title={seat.status}
          ></div>
        ))}
      </div>
    </div>
  );
}
