import React from "react";

const SeatAllocationUser = ({totalSeats = 25,seatAllocation = [], selectedSeat,onSelectSeat}) => {
  const seats = Array.from({ length: totalSeats }, (_, i) => {
    const seat = seatAllocation[i];
    return seat?.status || "Available Seats"; 
  });

  const handleSeatClick = (index) => {
    const status = seats[index];
    if (status === "Reserved Seats" || status === "Paid") return;
    onSelectSeat(index + 1); 
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Choose Your Seat</h3>
      <div className="grid grid-cols-6 gap-2">
        {seats.map((status, i) => {
          let bgColor = "bg-gray-300"; 
          if (status === "Reserved Seats") bgColor = "bg-purple-300"; 
          if (status === "Paid") bgColor = "bg-purple-700"; 
          if (i + 1 === selectedSeat) bgColor = "bg-gray-600"; 

          return (
            <div
              key={i}
              onClick={() => handleSeatClick(i)}
              className={`w-8 h-8 flex items-center justify-center rounded cursor-pointer ${bgColor} hover:opacity-80 transition text-white text-xs`}
              title={`Seat ${i + 1}: ${status}`}>{i + 1}</div>
          );
          })}
      </div>

      <div className="mt-4 text-gray-600 text-sm flex gap-4">
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-gray-300 rounded"></span> Available Seats
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-purple-300 rounded"></span> Reserved Seats
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-purple-700 rounded"></span> Paid
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-gray-600 rounded"></span> Selected
        </div>
      </div>
    </div>
  );
};

export default SeatAllocationUser;
