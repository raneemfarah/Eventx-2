import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./Sections/topbar";
import EventInfo from "./Sections/eventInfo";
import EventStatus from "./Sections/eventStatus";
import SeatAllocation from "./Sections/seatAllocation";
import QRCodeActions from "./Sections/QRCodeActions";
import api from "../../Services/api"; 

const AddEvent = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({eventId: crypto.randomUUID(),name: "",venue: "",description: "",ticketPrice: "",totalSeats: "",
    availableSeats: "", popularity: "Low Popularity",tags: "",expectedAttendance: "", selectedSeats: [],qrCodeUrl: "",date: "",time: "",reservedSeats: []
  });

  const handleSeatSelect = (selected) => {
    setEventData({ ...eventData, reservedSeats: selected });
  };

  const preparePayload = () => {
    if (!eventData.date || !eventData.time)
      throw new Error("Please select a valid date and time");

    const dateTime = new Date(`${eventData.date}T${eventData.time}`);
    const totalSeatsNum = Number(eventData.totalSeats || 0);
    const ticketPriceNum = Number(eventData.ticketPrice);
    const expectedAttendanceNum = Number(eventData.expectedAttendance);

    const seatAllocation = Array.from({ length: totalSeatsNum }, (_, i) => ({
      seatNumber: (i + 1).toString(),
      status: (eventData.reservedSeats || []).includes(i)
        ? "Reserved Seats"
        : "Available Seats",
    }));

    return {
      ...eventData,
      dateTime,
      ticketPrice: ticketPriceNum,
      totalSeats: totalSeatsNum,
      availableSeats: totalSeatsNum - (eventData.reservedSeats?.length || 0),
      expectedAttendance: expectedAttendanceNum,
      tags: eventData.tags
        ? eventData.tags.split(",").map((tag) => tag.trim())
        : [],
      seatAllocation,
    };
  };

  const handlePublish = async () => {
    try {
      const payload = preparePayload();
      const res = await api.post("/events", payload);
      const savedEvent = res.data.event;

      const qrUrl = `https://dummy-payment.com/event/${savedEvent._id}`;
      await api.put(`/events/${savedEvent._id}`, { qrCodeUrl: qrUrl });

      setEventData({ ...savedEvent, qrCodeUrl: qrUrl });

      alert("Event published successfully!");
      navigate("/manage-events"); 
    } catch (err) {
      console.error("Error publishing event:", err.response?.data || err.message);
      alert("failed to publish event");
    }
  };
  const handleSaveDraft = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const payload = preparePayload();
      payload.isDraft = true;

      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to save draft");

      console.log("Draft saved:", result);
      navigate("/manage-events"); 
    } catch (err) {
      console.error("Error saving draft:", err);
    }
  };

  const handleBack = () => console.log("back");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <Topbar onBack={handleBack} />
        <div className="grid grid-cols-1 gap-6">
          <EventInfo
            name={eventData.name}
            setName={(val) => setEventData({ ...eventData, name: val })}
            venue={eventData.venue}
            setVenue={(val) => setEventData({ ...eventData, venue: val })}
            description={eventData.description}
            setDescription={(val) => setEventData({ ...eventData, description: val })}
            date={eventData.date}
            setDate={(val) => setEventData({ ...eventData, date: val })}
            time={eventData.time}
            setTime={(val) => setEventData({ ...eventData, time: val })}
          />

          <EventStatus
            ticketPrice={eventData.ticketPrice}
            totalSeats={eventData.totalSeats}
            availableSeats={eventData.availableSeats}
            popularity={eventData.popularity}
            handleChange={(e) =>
              setEventData({ ...eventData, [e.target.name]: e.target.value })
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <SeatAllocation
                totalSeats={eventData.totalSeats || 25}
                paidSeats={eventData.paidSeats || []}
                reservedSeats={eventData.reservedSeats || []}
                onSeatSelect={handleSeatSelect}
              />
            </div>

            <div className="md:col-span-1">
              <QRCodeActions
                eventData={eventData}
                setEventData={setEventData}
                handlePublish={handlePublish}
                handleSaveDraft={handleSaveDraft}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
