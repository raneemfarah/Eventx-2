import React, { useState, useEffect } from "react";

const EditSeatAllocation = ({
  totalSeats = 25,
  paidSeats = [],
  reservedSeats = [],
  onSeatSelect,
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    setSelectedSeats(reservedSeats);
  }, [reservedSeats]);

  const handleSeatClick = (seatIndex) => {
    if (paidSeats.includes(seatIndex)) return;

    let updatedSelection = [];
    if (selectedSeats.includes(seatIndex)) {
      updatedSelection = selectedSeats.filter((s) => s !== seatIndex);
    } else {
      updatedSelection = [...selectedSeats, seatIndex];
    }
    setSelectedSeats(updatedSelection);

    if (onSeatSelect) onSeatSelect(updatedSelection);
  };

  const seats = Array.from({ length: totalSeats });
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 text-center">Seat Allocation</h3>
      <div className="grid grid-cols-6 gap-2 justify-center">
        {seats.map((_, i) => {
          const isPaid = paidSeats.includes(i);
          const isReserved = selectedSeats.includes(i);

          let bgColor = "bg-gray-300";
          if (isPaid) bgColor = "bg-purple-700";
          else if (isReserved) bgColor = "bg-purple-400";

          return (
            <div
              key={i}
              onClick={() => handleSeatClick(i)}
              className={`w-6 h-6 flex items-center justify-center rounded cursor-pointer ${bgColor} hover:opacity-80 transition text-white text-xs`}
              title={`Seat ${i + 1}: ${
                isPaid ? "Paid" : isReserved ? "Reserved" : "Available"
              }`}
            >
              {i + 1}
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-gray-600 text-sm flex gap-6 justify-center">
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-gray-300 rounded"></span> Available
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-purple-400 rounded"></span> Reserved
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-purple-700 rounded"></span> Paid
        </div>
      </div>
    </div>
  );
};

export default EditSeatAllocation;
