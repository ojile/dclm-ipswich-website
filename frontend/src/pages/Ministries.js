import React, { useContext } from 'react';
import MinistryCard from '../components/MinistryCard';
import { MinistryContext } from '../assets/context/MinistryContext';
import '../assets/styles/components-css/ministries.css'; // Import CSS styles for the landing page
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

const Ministries = () => {
  const { ministries } = useContext(MinistryContext) || {}; // Ensure ministries is an object to avoid destructuring error

  return (
    <div className="ministries-container">
      <header className="ministries-header">
        <h1>Our Ministries</h1>
        <p>Discover the various ways we serve and grow together in faith.</p>
        {/* Links to the different ministries */}
        <nav className="ministries-nav">
          <ul>
            <li><Link to="/ministries/children">Children Ministry</Link></li>
            <li><Link to="/ministries/youth">Youth Ministry</Link></li>
            <li><Link to="/ministries/women">Women Ministry</Link></li>
            <li><Link to="/ministries/young-adult">Young Adult Ministry</Link></li>
            <li><Link to="/ministries/evangelistic">Senior Ministry</Link></li>
          </ul>
        </nav>
      </header>
      <main className="ministries-main">
        {ministries && ministries.length > 0 ? (
          <div className="ministries-grid">
            {ministries.map((ministry) => (
              <MinistryCard key={ministry.id} {...ministry} />
            ))}
          </div>
        ) : (
          <p className="no-ministries-message">No ministries available at the moment.</p>
        )}
      </main>
    </div>
  );
};

export default Ministries;
