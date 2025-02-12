import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then((response) => setEvents(response.data))
      .catch((error) => console.error(error));
  }, []);

  const filteredEvents = events.filter((event) =>
    event.Competition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-20 p-6">
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventPage;