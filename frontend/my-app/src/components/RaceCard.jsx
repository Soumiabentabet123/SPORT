import { Link } from "react-router-dom";

const RaceCard = ({ race }) => {
  return (
    <Link to={`/race/${race.Course}/${race.Distance}`}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
        <div className="p-4">
          <h2 className="text-xl font-bold">{race.Course}</h2>
          <p className="text-gray-600">{race.Distance} km</p>
        </div>
      </div>
    </Link>
  );
};

export default RaceCard;