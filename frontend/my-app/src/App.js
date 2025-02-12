import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventPage from "./pages/EventPage";
import ParticipantPage from "./pages/ParticipantPage";
import RacePage from "./pages/RacePage";
import Header from "./components/header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<EventPage />} />
        <Route path="/event/:competition/:date" element={<RacePage />} />
        <Route path="/race/:raceId" element={<ParticipantPage />} />
      </Routes>
    </Router>
  );
}

export default App;
