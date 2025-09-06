import React from "react";

const EditEventInfo = ({ eventData, setEventData }) => {
  if (!eventData) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={eventData.name}
            onChange={(e) =>
              setEventData({ ...eventData, name: e.target.value })
            }
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={eventData.date}
            onChange={(e) =>
              setEventData({ ...eventData, date: e.target.value })
            }
            className="border px-2 py-1 rounded w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Venue:</label>
          <input
            type="text"
            value={eventData.venue}
            onChange={(e) =>
              setEventData({ ...eventData, venue: e.target.value })
            }
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            value={eventData.time}
            onChange={(e) =>
              setEventData({ ...eventData, time: e.target.value })
            }
            className="border px-2 py-1 rounded w-full"
          />
        </div>
      </div>

      <div>
        <label>Description:</label>
        <textarea
          value={eventData.description}
          onChange={(e) =>
            setEventData({ ...eventData, description: e.target.value })
          }
          className="border px-2 py-1 rounded w-full"
        />
      </div>
    </div>
  );
};

export default EditEventInfo;
