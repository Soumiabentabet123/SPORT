// src/components/Event.js
import React from 'react';

function Event({ eventName, onClick }) {
  return (
    <div className="event-card" onClick={onClick}>
      <h3>{eventName}</h3>
    </div>
  );
}

export default Event;
