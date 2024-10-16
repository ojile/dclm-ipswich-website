import React from 'react';
import '../assets/styles/components-css/event-card.css'; // Importing the CSS for event card

const EventCard = ({ title, date, description, location, imageUrl }) => {
  return (
    <div className="event-card">
      <div className="event-card-image" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="overlay">
          <h2 className="event-card-title">{title}</h2>
          <p className="event-card-date">{new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="event-card-content">
        <p className="event-card-description">{description}</p>
          </div>
          <div className="event-card-content">
        <p className="event-card-location">{location}</p>
      </div>  
      <div className="event-card-footer">
        <button className="view-details-button">View Details</button>
      </div>
    </div>
  );
};

export default EventCard;
