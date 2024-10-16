// src/pages/WomenMinistry.js
import React, { useState } from 'react';
import Slider from 'react-slick'; // Import the Slider component
import '../assets/styles/components-css/women-ministry.css'; // Updated CSS file path

const womenEvents = [
  {
    id: 1,
    title: 'Women Empowerment Seminar',
    date: '2024-11-01',
    description: 'A seminar to inspire and empower women in various aspects of life.',
    location: 'Main Auditorium',
    imageUrl: 'https://via.placeholder.com/400x200', // Placeholder image
  },
  {
    id: 2,
    title: 'Marriage & Family Workshop',
    date: '2024-11-10',
    description: 'An insightful workshop on marriage and family matters.',
    location: 'Community Hall',
    imageUrl: 'https://via.placeholder.com/400x200', // Placeholder image
  },
  {
    id: 3,
    title: 'Women’s Prayer Session',
    date: 'Every Friday',
    description: 'A weekly prayer session focused on spiritual growth.',
    location: 'Church Sanctuary',
    imageUrl: 'https://via.placeholder.com/400x200', // Placeholder image
  },
];

const galleryImages = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/600x400', // Example image
    alt: 'Women Activity 1',
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/600x400', // Example image
    alt: 'Women Activity 2',
  },
  {
    id: 3,
    imageUrl: 'https://via.placeholder.com/600x400', // Example image
    alt: 'Women Activity 3',
  },
  {
    id: 4,
    imageUrl: 'https://via.placeholder.com/600x400', // Example image
    alt: 'Women Activity 4',
  },
  // Add more images as needed
];

const WomenMinistry = () => {
  const [modalImage, setModalImage] = useState(null);

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  // Settings for React Slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Time between transitions
  };

  return (
    <div className="women-ministry-container">
      {/* Hero Section */}
      <section className="women-hero-section">
        <div className="hero-overlay">
          <h1>Women Ministry</h1>
          <p>Welcome to the Women Ministry.</p>
          <div className="women-ministry-focus-text">
            <p style={{ color: 'white' }}>
              Providing pastoral care, counseling, and guidance on marriage, child upbringing, career, and more to help women thrive spiritually and in life.
            </p>
          </div>
        </div>
      </section>

      {/* Section Title */}
      <h2 className="women-events-title">Women Events</h2>

      {/* Events Section */}
      <div className="women-events-scroll-container">
        <button className="arrow-button left">←</button>
        <section className="women-events-list">
          {womenEvents.map((event) => (
            <div key={event.id} className="women-event-card">
              <img src={event.imageUrl} alt={event.title} />
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.description}</p>
              <p>{event.location}</p>
            </div>
          ))}
        </section>
        <button className="arrow-button right">→</button>
      </div>

      {/* Picture Gallery Section */}
      <h2 className="women-gallery-title">Women Ministry Gallery</h2>
      <div className="women-gallery">
        <Slider {...sliderSettings}>
          {galleryImages.map((image) => (
            <div key={image.id} className="gallery-item" onClick={() => openModal(image.imageUrl)}>
              <img src={image.imageUrl} alt={image.alt} className="gallery-thumbnail" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Modal for Full-Sized Image */}
      {modalImage && (
        <div className="modal" onClick={closeModal}>
          <span className="close">&times;</span>
          <img className="modal-content" src={modalImage} alt="Full-size" />
        </div>
      )}

      {/* Footer */}
      <footer className="women-ministry-footer">
        <p>Join us in empowering women and making a positive impact in their lives!</p>
      </footer>
    </div>
  );
};

export default WomenMinistry;
