import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import TopbarDetails from "./Sections/topbarDetails";
import EventInfo from "./Sections/eventInfoDetails";
import EventStatus from "./Sections/eventStatusDetails";
import SeatAllocation from "./Sections/seatAllocationDetails";
import QRCodeActions from "./Sections/QRCodeActionsDetails";
import api from "../../Services/api";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 

  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        console.log("Event fetched:", res.data);

        const data = res.data;

        if (data.dateTime) {
          const dt = new Date(data.dateTime);
          data.date = dt.toISOString().split("T")[0]; 
          data.time = dt.toTimeString().slice(0, 5); 
        }
        data.bookedSeats = data.seatAllocation?.map(seat => seat.index) || [];
        setEventData(data);
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };
    fetchEvent();
  }, [id]);

  if (!eventData) return <p>Loading event details...</p>;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <TopbarDetails />

      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <EventInfo event={eventData} />
        <EventStatus event={eventData} />

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <SeatAllocation
              totalSeats={eventData.totalSeats || 25}
              seatAllocation={eventData.seatAllocation || []}
            />
          </div>

          <div className="w-full md:w-1/2">
            <QRCodeActions
              eventData={eventData}
              handleEdit={() => navigate(`/editevent/${eventData._id}`)} 
              handleInsights={() => console.log("Attendee Insights clicked")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
