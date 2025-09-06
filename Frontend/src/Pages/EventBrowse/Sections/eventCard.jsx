import { CurrencyDollarIcon, TicketIcon, ShoppingCartIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 max-w-sm w-full relative flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {event.name}
        </h3>
      </div>

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
          <span className="truncate">{event.venue}</span>
        </div>
        <div className="flex">
          <span className="font-medium w-20">Date:</span>
          <span>
            {event.dateTime && new Date(event.dateTime).toLocaleDateString()}
          </span>
        </div>
        <div className="flex">
          <span className="font-medium w-20">Time:</span>
          <span>
            {event.dateTime && new Date(event.dateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <button
          onClick={() => navigate(`/eventDetailsUser/${event._id}`)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <ArrowRightIcon className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
};
export default EventCard;