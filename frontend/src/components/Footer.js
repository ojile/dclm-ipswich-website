import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 footer-fixed-bottom">
      <div className="container text-center">
        <p>&copy; 2024 Deeper Christian Life Ministries. All rights reserved.</p>
        <div className="social-links my-3">
          <a className="text-white mx-2" href="#" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i> {/* Font Awesome Icon */}
          </a>
          <a className="text-white mx-2" href="#" aria-label="Twitter">
            <i className="fab fa-twitter"></i> {/* Font Awesome Icon */}
          </a>
          <a className="text-white mx-2" href="#" aria-label="Instagram">
            <i className="fab fa-instagram"></i> {/* Font Awesome Icon */}
          </a>
        </div>
       
      </div>
    </footer>
  );
};

export default Footer;
