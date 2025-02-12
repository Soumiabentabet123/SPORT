import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ParticipantsTable from '../components/ParticipantsTable';

const ParticipantPage = () => {
  const { raceId } = useParams();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/participants/${raceId}`)
      .then((response) => setParticipants(response.data))
      .catch((error) => console.error(error));
  }, [raceId]);

  return (
    <div className="pt-20 p-6">
      <ParticipantsTable participants={participants} />
    </div>
  );
};

export default ParticipantPage;