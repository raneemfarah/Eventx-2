import { QRCodeCanvas } from "qrcode.react";

const QRCodeActionsUser = ({ eventData, selectedSeat, onConfirm }) => {
  return (
    <div className="md:col-span-2">
      <div className="bg-white p-6 rounded-lg shadow-md">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Tags
            </label>
            <p className="w-full border border-black px-3 py-2 rounded-lg bg-gray-50 text-gray-800">
              {eventData.tags}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Expected Attendance
            </label>
            <p className="w-full border border-black px-3 py-2 rounded-lg bg-gray-50 text-gray-800">
              {eventData.expectedAttendance || "+1000"}
            </p>
          </div>
        </div>
        <div className="mb-6 text-center">
          <QRCodeCanvas
            value={
              eventData.qrCodeUrl ||
              (selectedSeat && eventData._id
                ? `https://dummy-payment.com/ticket/${eventData._id}_${selectedSeat}`
                : "")
            }
            size={150}
            className="border border-black p-3 rounded-lg bg-gray-50 mx-auto"
          />
          <p className="text-gray-600 text-sm mt-2">
            Scan QR code for easy payments
          </p>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              if (!selectedSeat) {
                alert("Please select a seat first");
                return;
              }
              onConfirm();
            }}
            className="bg-[#1A6291] text-white font-medium px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            Confirm
          </button>
        </div>

      </div>
    </div>
  );
};

export default QRCodeActionsUser;
