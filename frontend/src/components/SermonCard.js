// src/components/SermonCard.js
import React from 'react';
import '../assets/styles/components-css/sermon-card.css';

const SermonCard = ({ title, content, date, videoId }) => {
  // Ensure the videoId is correctly formatted
  const formattedVideoId = videoId ? videoId.split('?')[0] : "QOqoY59knds"; // Default video ID if none provided

  return (
    <div className="sermon-card">
      <figure className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${formattedVideoId}`} // Use the actual video ID
          title={title}
          frameBorder="0"
          allowFullScreen
          aria-label={title}
        />
        <div className="overlay">
          <h3>{title || "No Title Available"}</h3> {/* Display title or fallback */}
        </div>
      </figure>
      <div className="card-content">
        <p>{content || "No description available."}</p> {/* Display content or fallback */}    
        <span className="date">
          {date ? new Date(date).toLocaleDateString() : "Date not available."}
        </span> {/* Format date or fallback */}
      </div>
    </div>
  );
};

export default SermonCard;
