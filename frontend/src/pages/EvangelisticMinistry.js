import React from 'react';
import '../assets/styles/components-css/evangelistic-ministry.css'; // Updated CSS file path
import EventCard from '../components/EventCard'; // Assuming EventCard is reusable

const evangelisticEvents = [
  {
    id: 1,
    title: 'Community Outreach',
    date: '2024-10-10',
    description: 'Reaching out to the community with the gospel.',
    location: 'Central Park',
    imageUrl: 'https://via.placeholder.com/400x200', // Placeholder image
  },
  {
    id: 2,
    title: 'Crusade for Christ',
    date: '2024-11-05',
    description: 'Join us for a life-changing crusade for Christ.',
    location: 'Main Square',
    imageUrl: 'https://via.placeholder.com/400x200', // Placeholder image
  },
  {
    id: 3,
    title: 'Street Evangelism',
    date: 'Every Saturday',
    description: 'Spreading the good news on the streets.',
    location: 'Downtown',
    imageUrl: 'https://via.placeholder.com/400x200', // Placeholder image
  },
  // Add more events as needed
];

const EvangelisticMinistry = () => {
  return (
    <div className="evangelistic-ministry-container">
      {/* Hero Section */}
      <section className="evangelistic-hero-section">
        <div className="hero-overlay">
          <h1>Evangelistic Ministry</h1>
          <p>Welcome to the Evangelistic Ministry page.</p>

          {/* Text Below Cards */}
          <div className="evangelistic-ministry-focus-text">
            <p>We are committed to spreading the gospel through various outreach programs and evangelistic campaigns.</p>
          </div>
        </div>
      </section>

      <h2 className="evangelistic-events-header">Evangelistic Events</h2>

      {/* Events Section */}
      <div className="evangelistic-events-scroll-container">
        <button className="arrow-button left">←</button>
        <section className="evangelistic-events-list">
          {evangelisticEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </section>
        <button className="arrow-button right">→</button>
      </div>

      {/* Footer */}
      <footer className="evangelistic-ministry-footer">
        <p>Join us in spreading the gospel to the ends of the earth!</p>
      </footer>
    </div>
  );
};

export default EvangelisticMinistry;
