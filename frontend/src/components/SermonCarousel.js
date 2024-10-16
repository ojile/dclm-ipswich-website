// SermonCarousel.js
import React, { useContext } from 'react';
import Slider from 'react-slick';
import { SermonContext } from '../assets/context/SermonContext';
import SermonCard from '../components/SermonCard';
import '../assets/styles/components-css/sermon-carousel.css'; // Create a CSS file for custom styles if needed

const SermonCarousel = () => {
  const { sermons, loading, error } = useContext(SermonContext);

  const settings = {
    dots: true, // Show dots below the carousel
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true, // Show left and right arrows
  };

  if (loading) {
    return <p>Loading sermons...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Slider {...settings} className="sermon-carousel">
      {sermons.map((sermon) => (
        <SermonCard
          key={sermon.id}
          title={sermon.title}
          description={sermon.content} // Update this if you have a different field for description
          videoUrl={sermon.videoUrl}
          date={sermon.date_preached} // Adjust if your date field is different
        />
      ))}
    </Slider>
  );
};

export default SermonCarousel;
