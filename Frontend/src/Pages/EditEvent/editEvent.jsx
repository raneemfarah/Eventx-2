import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditTopbar from "./Sections/editTopbar";
import EditEventInfo from "./Sections/editEventInfo";
import EditEventStatus from "./Sections/editEventStatus";
import EditSeatAllocation from "./Sections/editSeatAllocation";
import QRSection from "./Sections/QrSection";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({name: "",venue: "", description: "", date: "",time: "", ticketPrice: "",
    totalSeats: 0,availableSeats: 0, popularity: "Medium Popularity", tags: "",expectedAttendance: "",reservedSeats: [],paidSeats: [],qrCodeUrl: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/events/${id}`)
      .then((res) => {
        console.log("Event fetched:", res.data);
        const event = res.data;
        const dt = new Date(event.dateTime);
        const date = dt.toISOString().split("T")[0];
        const time = dt.toISOString().split("T")[1].slice(0, 5);
        const paidSeats = event.seatAllocation
          .map((seat, index) => (seat.status === "Paid" ? index : null))
          .filter((i) => i !== null);
        const reservedSeats = event.seatAllocation
          .map((seat, index) => (
            seat.status === "Reserved Seats" || seat.status === "Reserved Seats" ? index : null
          ))
          .filter((i) => i !== null);

        setEventData({
          name: event.name,
          venue: event.venue,
          description: event.description,
          date,time,
          ticketPrice: event.ticketPrice,
          totalSeats: event.totalSeats,
          availableSeats: event.availableSeats,
          popularity: event.popularity,
          tags: event.tags.join(", "),
          expectedAttendance: event.expectedAttendance || "",
          reservedSeats,
          paidSeats,
          qrCodeUrl: event.qrCodeUrl,
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

const handleSave = async () => {
  try {
    const dateTime = new Date(`${eventData.date}T${eventData.time}`);

    const seatAllocation = Array.from({ length: eventData.totalSeats }, (_, i) => {
      let status = "Available Seats";
      if (eventData.paidSeats.includes(i)) status = "Paid";
      else if (eventData.reservedSeats.includes(i)) status = "Reserved Seats";
      return { seatNumber: `${i + 1}`, status };
    });

    const token = localStorage.getItem("token"); 
    await axios.put(`http://localhost:5000/api/events/${id}`, {
      name: eventData.name,
      venue: eventData.venue,
      description: eventData.description,
      dateTime,
      ticketPrice: eventData.ticketPrice,
      totalSeats: eventData.totalSeats,
      availableSeats: eventData.availableSeats,
      popularity: eventData.popularity,
      tags: eventData.tags.split(",").map((t) => t.trim()),
      expectedAttendance: eventData.expectedAttendance,
      seatAllocation,
      qrCodeUrl: eventData.qrCodeUrl,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert("Event updated successfully");
    navigate("/"); 
  } catch (err) {
    console.error(err);
    alert("Error updating event: " + err.response?.data?.message || err.message);
  }
};

  const handleSeatSelect = (selected) => {
    setEventData({ ...eventData, reservedSeats: selected });
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <EditTopbar />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
        <EditEventInfo eventData={eventData} setEventData={setEventData} />
        <EditEventStatus eventData={eventData} setEventData={setEventData} />
        <EditSeatAllocation
          totalSeats={eventData.totalSeats}
          paidSeats={eventData.paidSeats}
          reservedSeats={eventData.reservedSeats}
          onSeatSelect={handleSeatSelect}
        />

        <QRSection
          eventData={eventData}
          setEventData={setEventData}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
};

export default EditEvent;
