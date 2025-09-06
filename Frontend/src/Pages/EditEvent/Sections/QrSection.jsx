import { QRCodeCanvas } from "qrcode.react";

const QRCodesection = ({ eventData, setEventData, handleSave }) => {
  return (
    <div className="md:col-span-2 flex justify-center mb-6">
      <div className="p-6 rounded-lg w-full max-w-sm">
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Expected Attendance
            </label>
            <input
              type="number"
              value={eventData.expectedAttendance}
              onChange={(e) =>
                setEventData({ ...eventData, expectedAttendance: e.target.value })
              }
              className="w-full border p-2 rounded-lg"
              placeholder="Enter number of attendees"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={eventData.tags}
              onChange={(e) => setEventData({ ...eventData, tags: e.target.value })}
              className="w-full border p-2 rounded-lg"
              placeholder="Enter tags separated by commas"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            QR Code
          </label>
          <div className="flex justify-center">
            <QRCodeCanvas
              value={
                eventData.qrCodeUrl ||
                (eventData._id ? `https://dummy-payment.com/event/${eventData._id}` : "")
              }
              size={150}
              className="border p-3 rounded-lg bg-gray-50"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-green-600 text-white font-medium px-4 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Save Updates
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodesection;
