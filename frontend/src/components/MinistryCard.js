// src/components/MinistryCard.js
import React from 'react';

const MinistryCard = ({ name, description }) => {
  return (
    <div className="ministry-card">
      <h3>{name}</h3>
      <p>{description}</p>
      <button>Join Us</button>
    </div>
  );
};

export default MinistryCard;
