import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <Link to={`/event/${event.Competition}/${event.DateCompet}`}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
        <img
          src={event.image || "https://via.placeholder.com/400x200"}
          alt={event.Competition}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold">{event.Competition}</h2>
          <p className="text-gray-600">{event.DateCompet}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;