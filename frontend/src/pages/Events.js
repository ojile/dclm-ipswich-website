import React, { useContext, useEffect, useRef, useState } from 'react';
import EventCard from '../components/EventCard';
import { EventContext } from '../assets/context/EventContext';
import '../assets/styles/components-css/events.css';

const Events = () => {
  const { events, loading, error, refresh } = useContext(EventContext);
  const [visibleEvents, setVisibleEvents] = useState([]);
  const eventsContainerRef = useRef(null);

  useEffect(() => {
    // Reverse the events array to show the latest added event first
    setVisibleEvents([...events].reverse());
  }, [events]);

  const scrollLeft = () => {
    if (eventsContainerRef.current) {
      eventsContainerRef.current.scrollBy({
        top: 0,
        left: -300, // Adjust the scroll amount
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (eventsContainerRef.current) {
      eventsContainerRef.current.scrollBy({
        top: 0,
        left: 300, // Adjust the scroll amount
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={refresh} className="retry-button">Try Again</button>
      </div>
    );
  }

  return (
    <div className="events-container">
      <header className="events-header">
        <h1 className="events-title">Upcoming Events</h1>
        <p className="events-subtitle">Join us for our upcoming events and activities.</p>
      </header>

      <div className="events-scroll-container">
        <button className="arrow-button left" onClick={scrollLeft}>←</button>
        <section className="events-list" ref={eventsContainerRef}>
          {visibleEvents.length > 0 ? (
            visibleEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))
          ) : (
            <div className="no-events-message">
              <p>No events available at the moment. Please check back later.</p>
            </div>
          )}
        </section>
        <button className="arrow-button right" onClick={scrollRight}>→</button>
      </div>

      <footer className="events-footer">
        <p>Subscribe for the latest updates on new events and activities.</p>
      </footer>
    </div>
  );
};

export default Events;
