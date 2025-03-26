import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CompetitionList from './components/CompetitionList';
import CourseDetails from './components/CourseDetails';
import ParticipantList from './components/ParticipantList';
import './styles.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<CompetitionList />} />
          <Route path="/competitions/:competitionName" element={<CourseDetails />} />
          <Route path="/competitions/:competitionName/courses/:courseName" element={<ParticipantList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;