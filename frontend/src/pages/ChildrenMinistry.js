import React from 'react';
import '../assets/styles/components-css/children-ministry.css'; // Updated CSS file path
import EventCard from '../components/EventCard'; // Assuming EventCard is reusable

const childrenEvents = [
  {
    id: 1,
    title: 'Sincere Milk',
    date: '2024-10-05',
    description: 'A fun-filled event teaching kids about faith.',
    location: 'Church Hall',
    imageUrl: 'https://via.placeholder.com/400x200', // Placeholder image
  },
  {
    id: 2,
    title: 'Children Bible Studies',
    date: '2024-10-08',
    description: 'Weekly bible studies for children every Wednesday.',
    location: 'ZOOM',
    imageUrl: 'https://via.placeholder.com/400x200', // Placeholder image
  },
  {
    id: 3,
    title: 'Sunday Service for Kids',
    date: 'Every Sunday',
    description: 'Join us for our exciting Sunday service tailored for kids!',
    location: 'Church Sanctuary',
    imageUrl: 'https://via.placeholder.com/400x200', // Placeholder image
  },
  // Add more events as needed
];

const ChildrenMinistry = () => {
  return (
    <div className="children-ministry-container">
      {/* Hero Section */}
      <section className="children-hero-section">
        <div className="hero-overlay">
          <h1>Children Ministry</h1>
          <p>Welcome to the Children Ministry page.</p>

          {/* Text Below Cards */}
          <div className="children-ministry-focus-text">
            <p>We focus on evangelizing, teaching, and discipling children to live victorious Christian lives.</p>
          </div>
        </div>
      </section>
      <h2 style={{ paddingTop: '20px' }}></h2>

      <h2 className="children-events-header">Children Events</h2>

      {/* Events Section */}
      <div className="children-events-scroll-container">
        <button className="arrow-button left">←</button>
        <section className="children-events-list">
          {childrenEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </section>
        <button className="arrow-button right">→</button>
      </div>

      {/* Footer */}
      <footer className="children-ministry-footer">
        <p>Join us in nurturing the faith of our children!</p>
      </footer>
    </div>
  );
};

export default ChildrenMinistry;
