// src/pages/EventDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import eventService from '../services/eventService';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    eventService.getEventById(id).then(setEvent);
  }, [id]);

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.date} at {event.location}</p>
      <p>{event.description}</p>
    </div>
  );
};

export default EventDetails;
