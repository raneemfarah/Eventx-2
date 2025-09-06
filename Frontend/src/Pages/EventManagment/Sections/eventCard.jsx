import { useState } from "react";
import {ArrowRightIcon,TrashIcon,CurrencyDollarIcon,TicketIcon,ShoppingCartIcon,} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event, onDelete }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 max-w-sm w-full relative flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {event.name}
        </h3>
        <span
          className="text-gray-500 cursor-pointer text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ⋮
        </span>
      </div>

      {menuOpen && (
        <div className="absolute right-4 top-12 bg-white border rounded-lg shadow-lg z-10 w-32">
          <button
            onClick={() => {
              setMenuOpen(false);
              setConfirmOpen(true);
            }}
            className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 w-full text-sm"
          >
            <TrashIcon className="w-5 h-5" />
            Delete
          </button>
        </div>
      )}
      <div className="flex items-center mt-4 gap-6">
        <div className="flex items-center gap-1 text-green-700 font-medium">
          <CurrencyDollarIcon className="w-5 h-5" />
          <span>{event.ticketPrice} LKR</span>
        </div>
        <div className="flex items-center gap-1 text-red-600 font-medium">
          <ShoppingCartIcon className="w-5 h-5" />
          <span>{event.totalSeats}</span>
        </div>
        <div className="flex items-center gap-1 text-purple-600 font-medium">
          <TicketIcon className="w-5 h-5" />
          <span>{event.availableSeats}</span>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex flex-col text-sm text-gray-700 space-y-2">
        <div className="flex">
          <span className="font-medium w-20">Venue:</span>
          <span className="truncate">{event.venue || "N/A"}</span>
        </div>
        <div className="flex">
          <span className="font-medium w-20">Date:</span>
          <span>
            {event.dateTime
              ? new Date(event.dateTime).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
        <div className="flex">
          <span className="font-medium w-20">Time:</span>
          <span>
            {event.dateTime
              ? new Date(event.dateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",}): "N/A"}
          </span>
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <button
          onClick={() => navigate(`/events/${event._id}`)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <ArrowRightIcon className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-20">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Are you sure you want to delete?            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                cancel
              </button>
              <button
                onClick={() => {
                  onDelete(event._id);
                  setConfirmOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
              >
                <TrashIcon className="w-4 h-4" />
                delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;

