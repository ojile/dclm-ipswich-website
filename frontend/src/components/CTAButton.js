// src/components/CTAButton.js
import React from 'react';

const CTAButton = ({ text, onClick }) => {
  return <button className="cta-button" onClick={onClick}>{text}</button>;
};

export default CTAButton;
