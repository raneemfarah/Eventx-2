import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import TopbarDetails from "./Sections/topbarUser";
import EventInfo from "./Sections/eventInfoUser";
import EventStatus from "./Sections/eventStatusUser";
import SeatAllocationUser from "./Sections/seatAllocationUser";
import QRCodeActionsUser from "./Sections/QRCodeActionsUser";
import api from "../../Services/api";
import { AuthContext } from "../../Contexts/authContext";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [eventData, setEventData] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        const data = res.data;
        if (data.dateTime) {
          const dt = new Date(data.dateTime);
          data.date = dt.toISOString().split("T")[0];
          data.time = dt.toTimeString().slice(0, 5);
        }
        if (!Array.isArray(data.seatAllocation) || data.seatAllocation.length === 0) {
          data.seatAllocation = Array.from({ length: data.totalSeats }, (_, i) => ({
            seatNumber: i + 1,
            status: "Available Seats"
          }));
        }
        setEventData(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchEvent();
  }, [id]);

  const handleConfirm = async () => {
    if (!selectedSeat) return alert("Please select a seat first!");
    if (!eventData || !eventData._id || !eventData.seatAllocation) return alert("Event data is not loaded properly.");
    const seatIndex = selectedSeat - 1;
    const seat = eventData.seatAllocation[seatIndex];
    if (!seat) return alert("Selected seat does not exist!");
    if (seat.status === "Paid" || seat.status === "Reserved Seats") return alert("This seat is already taken.");
    try {
      const res = await api.post("/tickets/book", {
        eventId: eventData._id,
        seatNumber: selectedSeat,
      });
      const newEventData = { ...eventData };
      newEventData.seatAllocation[seatIndex].status = "Paid";
      setEventData(newEventData);
      alert(`Ticket booked for event: ${res.data.ticket.eventName}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      const message = err.response?.data?.message || "Failed to book seat, please try again later!";
      alert(message);
    }
  };

  if (!eventData) return <p>Loading event details...</p>;

  return (
    <div className="space-y-6">
      <TopbarDetails />
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <EventInfo event={eventData} />
        <EventStatus event={eventData} />
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <SeatAllocationUser
              totalSeats={eventData.totalSeats}
              seatAllocation={eventData.seatAllocation}
              selectedSeat={selectedSeat}
              onSelectSeat={setSelectedSeat}
            />
          </div>
          <div className="w-full md:w-1/2">
            <QRCodeActionsUser
              eventData={eventData}
              selectedSeat={selectedSeat}
              onConfirm={handleConfirm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
