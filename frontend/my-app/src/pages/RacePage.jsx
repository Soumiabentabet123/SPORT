import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RaceCard from '../components/RaceCard';
import Filters from '../components/Filters';

const RacePage = () => {
  const { competition, dateCompet } = useParams();
  const [races, setRaces] = useState([]);
  const [filters, setFilters] = useState({ distance: '', type: '' });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/races/${competition}/${dateCompet}`)
      .then((response) => setRaces(response.data))
      .catch((error) => console.error(error));
  }, [competition, dateCompet]);

  const filteredRaces = races.filter((race) => {
    return (
      (!filters.distance || race.Distance === filters.distance) &&
      (!filters.type || race.Type === filters.type)
    );
  });

  return (
    <div className="pt-20 p-6">
      <Filters setFilters={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRaces.map((race) => (
          <RaceCard key={race._id} race={race} />
        ))}
      </div>
    </div>
  );
};

export default RacePage;