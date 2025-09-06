import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

const QRCodeActionsDetails = ({ eventData, handleInsights }) => {
  const navigate = useNavigate();

  if (!eventData) return <p>Loading QR Code...</p>;

  const handleEdit = () => {
    if (eventData && eventData._id) {
      navigate(`/editevent/${eventData._id}`);
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Expected Attendance
          </label>
          <p className="w-full border border-black px-3 py-2 rounded-lg bg-gray-50 text-gray-800">
            {eventData.expectedAttendance || "+1000"}
          </p>
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Tags
          </label>
          <p className="w-full border border-black px-3 py-2 rounded-lg bg-gray-50 text-black">
            {eventData.tags || "#Music, #Festival"}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center mb-6 gap-4">
        <QRCodeCanvas
          value={
            eventData.qrCodeUrl ||
            (eventData._id ? `https://dummy-payment.com/event/${eventData._id}` : "")
          }
          size={150}
          className="border border-gray-300 p-3 rounded-lg bg-gray-50"
        />
        <p className="text-gray-600 text-sm mt-2 md:mt-0 md:ml-4">
          Scan QR code for easy payments
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button
          type="button"
          onClick={handleEdit}
          className="flex-1 bg-[#CF730A] text-white font-medium px-4 py-3 rounded-lg shadow hover:opacity-90 transition"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={handleInsights}
          className="flex-1 bg-[#1A6291] text-white font-medium px-4 py-3 rounded-lg shadow hover:opacity-90 transition"
        >
          Attendee Insights
        </button>
      </div>
    </div>
  );
};

export default QRCodeActionsDetails;
