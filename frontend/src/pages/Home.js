import React, { useContext } from 'react';
import HeroBanner from '../components/HeroBanner';
import SermonCard from '../components/SermonCard';
import { SermonContext } from '../assets/context/SermonContext';
import Slider from "react-slick";
import '../assets/styles/components-css/home.css'; // Ensure custom styles are included

const Home = () => {
  const { sermons } = useContext(SermonContext);

  // Format date function
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Custom pagination dots
  const customPaging = (i) => {
    return (
      <div className="custom-dot">
        {i + 1} {/* Shows numbers for each dot */}
      </div>
    );
  };

  // Carousel settings with pagination dots
  const settings = {
    dots: true, // Show pagination dots
    customPaging: customPaging, // Use custom dots if needed
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <HeroBanner />
        <div className="hero-overlay">
          <h1>Welcome to Our Church</h1>
          <p>Join us for uplifting sermons and community events.</p>
          <button className="cta-button">Get Involved</button>
        </div>
      </div>

      {/* Latest Sermons Section */}
      <div className="content-section latest-sermons">
        <h2>Latest Sermons</h2>
        <Slider {...settings} className="sermon-carousel">
          {sermons.map((sermon) => (
            <div key={sermon.id} className="sermon-card">
              <a
                href={sermon.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <SermonCard
                  title={sermon.title}
                  description={sermon.content || 'No description available'}
                  videoUrl={sermon.videoUrl || 'https://www.youtube.com/watch?v=lbPHM-MiEUA'}
                  date={formatDate(sermon.date_preached)}
                />
              </a>
            </div>
          ))}
        </Slider>

        {/* Learn More Section */}
        <div className="view-all-section">
          <a href="/sermons" className="view-all-btn">View All Sermons</a>
        </div>
      </div>
    </>
  );
};

export default Home;
