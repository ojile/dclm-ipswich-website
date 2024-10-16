// src/pages/SermonDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const SermonDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Sermon Details - {id}</h1>
      {/* Fetch and display sermon details using the ID */}
    </div>
  );
};

export default SermonDetails;
