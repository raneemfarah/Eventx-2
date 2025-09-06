import { QRCodeCanvas } from "qrcode.react";

const QRCodeActions = ({ eventData, setEventData, handlePublish, handleSaveDraft }) => {
  return (
    <div className="md:col-span-2">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Expected Attendance
            </label>
            <input
              type="number"
              value={eventData.expectedAttendance}
              onChange={(e) => setEventData({ ...eventData, expectedAttendance: e.target.value })}
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
value={eventData.qrCodeUrl || (eventData._id ? `https://dummy-payment.com/event/${eventData._id}` : "")}
  size={150}
  className="border p-3 rounded-lg bg-gray-50"
/>

          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <button
  type="button"   
  onClick={handlePublish}
  className="flex-1 bg-blue-600 text-white font-medium px-4 py-3 rounded-lg shadow hover:bg-blue-700 transition"
>
  Publish
</button>

<button
  type="button"  
  onClick={() => handleSaveDraft({ ...eventData, isDraft: true })}
  className="flex-1 bg-gray-500 text-white font-medium px-4 py-3 rounded-lg shadow hover:bg-gray-600 transition"
>
  Save to Drafts
</button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeActions;