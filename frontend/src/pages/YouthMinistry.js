import React, { useState } from 'react';
import Slider from 'react-slick'; // Import the Slider component
import '../assets/styles/components-css/youth-ministry.css'; // Updated CSS file path

const youthEvents = [
  {
    id: 1,
    title: 'Youth Empowerment Conference',
    date: '2024-10-15',
    description: 'A powerful event to equip youths with leadership skills.',
    location: 'Main Auditorium',
    imageUrl: 'https://via.placeholder.com/400x200', // Placeholder image
  },
  {
    id: 2,
    title: 'Bible Study Sessions',
    date: '2024-10-20',
    description: 'Weekly Bible study for youths to grow spiritually.',
    location: 'ZOOM',
    imageUrl: 'https://via.placeholder.com/400x200', // Placeholder image
  },
  {
    id: 3,
    title: 'Youth Sunday Service',
    date: 'Every Sunday',
    description: 'A service specifically designed for the youth.',
    location: 'Church Sanctuary',
    imageUrl: 'https://via.placeholder.com/400x200', // Placeholder image
  },
];

const galleryImages = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/600x400', // Example image
    alt: 'Youth Activity 1',
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/600x400', // Example image
    alt: 'Youth Activity 2',
  },
  {
    id: 3,
    imageUrl: 'https://via.placeholder.com/600x400', // Example image
    alt: 'Youth Activity 3',
  },
  {
    id: 4,
    imageUrl: 'https://via.placeholder.com/600x400', // Example image
    alt: 'Youth Activity 4',
  },
  // Add more images as needed
];

const YouthMinistry = () => {
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
    <div className="youth-ministry-container">
      {/* Hero Section */}
      <section className="youth-hero-section">
        <div className="hero-overlay">
          <h1 style={{ color: 'white' }}>Youth Ministry</h1>
          <p style={{ color: 'white' }}>Welcome to the Youth Ministry.</p>
          <div className="youth-ministry-focus-text">
            <p style={{ color: 'white' }}>
              Known as the Victorious Youth of This Generation, we aim to transform the lives of young people and motivate them to succeed academically and spiritually.
            </p>
          </div>
        </div>
      </section>

      {/* Section Title */}
      <h2 className="youth-events-title">Youth Events</h2>

      {/* Events Section */}
      <div className="youth-events-scroll-container">
        <button className="arrow-button left">←</button>
        <section className="youth-events-list">
          {youthEvents.map((event) => (
            <div key={event.id} className="youth-event-card">
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
      <h2 className="youth-gallery-title">Youth Ministry Gallery</h2>
      <div className="youth-gallery">
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
      <footer className="youth-ministry-footer">
        <p>Join us in empowering the youth of today!</p>
      </footer>
    </div>
  );
};

export default YouthMinistry;
