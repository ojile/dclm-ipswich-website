// src/components/TestimonyCard.js
import React from 'react';

const TestimonyCard = ({ author, testimony }) => {
  return (
    <div className="testimony-card">
      <blockquote>{testimony}</blockquote>
      <p>- {author}</p>
    </div>
  );
};

export default TestimonyCard;
