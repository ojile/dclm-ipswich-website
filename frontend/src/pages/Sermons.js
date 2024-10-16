import React, { useContext, useEffect, useState } from 'react';
import { SermonContext } from '../assets/context/SermonContext';
import SermonCard from '../components/SermonCard';
import '../assets/styles/components-css/sermons.css'; // Add a dedicated CSS file for styling

const Sermons = () => {
  const { sermons, loading, error, refresh } = useContext(SermonContext);
  const [visibleSermons, setVisibleSermons] = useState([]);

  useEffect(() => {
    // Reverse the order of sermons to show the most recent first
    setVisibleSermons([...sermons].reverse());
    console.log('Sermons:', sermons); // Log sermons to check the data
  }, [sermons]);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading sermons...</p>
      </div>
    ); // Show loading text while fetching sermons
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={refresh} className="retry-button">Try Again</button>
      </div> // Retry fetching sermons
    );
  }

  return (
    <div className="sermons-container">
      <header className="sermons-header">
        <h1 className="sermon-title">All Sermons</h1>
        <p className="sermon-subtitle">
          Join us in faith and wisdom through our latest sermons.
        </p>
        <button className="cta-button">Watch Latest Sermons</button>
      </header>

      <section className="sermons-list">
        {visibleSermons && visibleSermons.length > 0 ? (
          visibleSermons.map((sermon) => (
            <SermonCard
              key={sermon.id}
              title={sermon.title}
              description={sermon.content} // Ensure this field exists in the sermon object
              videoUrl={sermon.videoUrl || 'https://www.youtube.com/watch?v=lbPHM-MiEUA'} // Default URL if null
              date={sermon.date_preached} // Use the correct key for date
            />
          ))
        ) : (
          <p className="no-sermons-message">No sermons available at the moment. Please check back later.</p>
        )}
      </section>

      <footer className="sermons-footer">
        <p>Subscribe for the latest updates on new sermons and events.</p>
      </footer>
    </div>
  );
};

export default Sermons;
