import React from "react";

const SeatAllocationDetails = ({ totalSeats = 25, seatAllocation = [] }) => {
  const seats = Array.from({ length: totalSeats }, (_, i) => {
    const seat = seatAllocation[i]; 
    return seat ? seat.status : "Available Seats";
  });

  return (
    <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg w-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Seat Allocation</h3>
      <div className="grid grid-cols-6 gap-4">
        {seats.map((status, i) => {
          let bgColor = "bg-gray-300"; 
          if (status === "Reserved Seats") bgColor = "bg-purple-300"; 
          if (status === "Paid") bgColor = "bg-purple-700"; 

          return (
            <div
              key={i}
              className={`w-8 h-8 rounded ${bgColor} cursor-default`}
              title={`Seat ${i + 1}: ${status}`}
            />);
        })}
      </div>

      <div className="mt-4 text-gray-600 text-sm flex items-center gap-6">
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-gray-300 rounded"></span> Available
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-purple-300 rounded"></span> Reserved
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-purple-700 rounded"></span> Paid
        </div>
      </div>
    </div>
  );
};

export default SeatAllocationDetails;
