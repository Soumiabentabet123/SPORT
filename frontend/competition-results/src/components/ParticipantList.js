import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getParticipants } from '../api';
import '../styles.css';

function ParticipantList() {
  const { competitionName, courseName } = useParams();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const data = await getParticipants(competitionName, courseName);
      setParticipants(data);
    };
    fetchParticipants();
  }, [competitionName, courseName]);

  return (
    <div className="container">
      <h1 className="title">Participants for {courseName} in {competitionName}</h1>
      <ul className="list">
        {participants.map((participant) => (
          <li key={participant.Nom + participant.Prénom} className="list-item">
            {participant.Nom} {participant.Prénom}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ParticipantList;