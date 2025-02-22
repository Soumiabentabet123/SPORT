// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import { getCompetitions, getCourses, getParticipants } from "./api";
import ParticipantListComponent from "./components/ParticipantList"; // Renamed import

// Component to show list of competitions
const CompetitionList = () => {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      const data = await getCompetitions();
      setCompetitions(data);
    };
    fetchCompetitions();
  }, []);

  return (
    <div>
      <h2>Competitions</h2>
      <ul>
        {competitions.map((competition) => (
          <li key={competition.name}>
            <Link to={`/competitions/${competition.name}`}>{competition.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component to show courses for a selected competition
const CourseList = ({ competitionName }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getCourses(competitionName);
      setCourses(data);
    };
    fetchCourses();
  }, [competitionName]);

  return (
    <div>
      <h2>Courses for {competitionName}</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.name}>
            <Link to={`/competitions/${competitionName}/courses/${course.name}`}>
              {course.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component to show participants for a selected course
const ParticipantList = ({ competitionName, courseName }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const data = await getParticipants(competitionName, courseName);
      setParticipants(data);
    };
    fetchParticipants();
  }, [competitionName, courseName]);

  return (
    <div>
      <h2>Participants for {courseName} in {competitionName}</h2>
      <ul>
        {participants.map((participant) => (
          <li key={participant.Nom + participant.Prénom}>
            {participant.Nom} {participant.Prénom}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Helper components to pass params to CourseList and ParticipantList
const CourseListWithParams = () => {
  const { competitionName } = useParams();
  return <CourseList competitionName={competitionName} />;
};

const ParticipantListWithParams = () => {
  const { competitionName, courseName } = useParams();
  return <ParticipantList competitionName={competitionName} courseName={courseName} />;
};

// Main App component that handles routing
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<CompetitionList />} />
          <Route path="/competitions/:competitionName" element={<CourseListWithParams />} />
          <Route path="/competitions/:competitionName/courses/:courseName" element={<ParticipantListWithParams />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
