import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ParticipantList() {
  const { competitionName, courseName } = useParams();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/competitions/${competitionName}/courses/${courseName}/participants`)
      .then(response => {
        setParticipants(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the participants!', error);
      });
  }, [competitionName, courseName]);

  return (
    <div>
      <h2>Participants in {courseName} of {competitionName}</h2>
      <ul>
        {participants.map(participant => (
          <li key={participant.id}>
            {participant.nom} {participant.prénom} 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ParticipantList;
