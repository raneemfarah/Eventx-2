import EventCard from "./eventCard";

const Tabs = ({ events, onDelete }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {events.map((event) => (
        <EventCard 
          key={event._id} 
          event={event} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default Tabs;
