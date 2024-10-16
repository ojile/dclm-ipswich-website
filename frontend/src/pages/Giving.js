import React from 'react';
import donationService from '../services/donationService';
import '../assets/styles/components-css/giving.css'; // Import your CSS for footer styles
import GivingImage from '../assets/images/Giving.jpg';

const Giving = () => {
  const handleDonation = (amount) => {
    donationService.submitDonation({ amount })
      .then(() => alert('Thank you for your generosity!'))
      .catch(() => alert('There was an error processing your donation.'));
  };

  return (
    <div className="giving-container">
      <div className="image-container">
        <img src={GivingImage} alt="Giving" className="giving-image" />
        <div className="overlay">
          <h1 className="overlay-title">Giving</h1>
          <p className="overlay-text">Your generous contributions make our ministry possible.</p>
        </div>
      </div>
      
      <div className="giving-section">
        <h2 className="section-title">GCK Giving</h2>
        <p className="section-description">
          We encourage our members to give generously and support the work of the ministry. Below are the bank details for your contributions:
        </p>
        <div className="bank-details">
          <p>Account Name: DCLM GLOBAL FUND</p>
          <p>Account Number: 70801453</p>
          <p>Sort Code: 20-12-26</p>
        </div>
        <p className="verse">“Give, and it will be given to you.” - Luke 6:38 (KJV)</p>
      </div>

      <div className="giving-section">
        <h2 className="section-title">Tithes & Offering</h2>
        <p className="section-description">
          Your tithes and offerings are vital to our mission. Please find the details below:
        </p>
        <div className="bank-details">
          <p>Account Name: DEEPER LIFE BIBLE</p>
          <p>Account Number: 93194639</p>
          <p>Sort Code: 20-12-26</p>
          <p>USE 'GIVEN CHURCH PIN' as reference</p>
        </div>
        <p className="verse">“Bring ye all the tithes into the storehouse.” - Malachi 3:10 (KJV)</p>
      </div>

      <div className="fixed-footer">
        Thank you for your generosity!
      </div>
    </div>
  );
};

export default Giving;
