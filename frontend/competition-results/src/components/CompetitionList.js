import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CompetitionList() {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/competitions')
      .then(response => {
        setCompetitions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the competitions!', error);
      });
  }, []);

  return (
    <div>
      <h2>List of Competitions</h2>
      <ul>
        {competitions.map(competition => (
          <li key={competition.name}>
            <Link to={`/competitions/${competition.name}/courses`}>
              {competition.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompetitionList;
