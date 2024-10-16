import React from 'react';
import '../assets/styles/components-css/young-adult-ministry.css'; // Updated CSS file path
import EventCard from '../components/EventCard'; // Assuming EventCard is reusable

const youngAdultEvents = [
  {
    id: 1,
    title: 'Young Professionals Meetup',
    date: '2024-11-12',
    description: 'A networking event for young professionals to connect and grow.',
    location: 'Community Center',
    imageUrl: 'https://via.placeholder.com/400x200', // Placeholder image
  },
  {
    id: 2,
    title: 'Career and Faith Workshop',
    date: '2024-11-18',
    description: 'Learn how to balance career success and spiritual growth.',
    location: 'ZOOM',
    imageUrl: 'https://via.placeholder.com/400x200', // Placeholder image
  },
  {
    id: 3,
    title: 'Young Adult Bible Study',
    date: 'Every Friday',
    description: 'Weekly Bible studies focused on challenges young adults face.',
    location: 'Church Hall',
    imageUrl: 'https://via.placeholder.com/400x200', // Placeholder image
  },
  // Add more events as needed
];

const YoungAdultMinistry = () => {
  return (
    <div className="young-adult-ministry-container">
      {/* Hero Section */}
      <section className="young-adult-hero-section">
        <div className="hero-overlay">
          <h1>Young Adult Ministry</h1>
          <p>Empowering young adults to thrive in their spiritual and professional lives.</p>

          {/* Text Below Cards */}
          <div className="young-adult-ministry-focus-text">
            <p>We focus on supporting young adults in navigating faith, career, and personal growth.</p>
          </div>
        </div>
      </section>

      <h2 style={{ paddingTop: '20px' }}></h2>

      <h2 className="young-adult-events-header">Upcoming Events</h2>

      {/* Events Section */}
      <div className="young-adult-events-scroll-container">
        <button className="arrow-button left">←</button>
        <section className="young-adult-events-list">
          {youngAdultEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </section>
        <button className="arrow-button right">→</button>
      </div>

      {/* Footer */}
      <footer className="young-adult-ministry-footer">
        <p>Stay connected and grow in your faith with us!</p>
      </footer>
    </div>
  );
};

export default YoungAdultMinistry;
