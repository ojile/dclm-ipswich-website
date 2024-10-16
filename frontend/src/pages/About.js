import React from 'react';
import ChurchLogo from '../assets/images/ChLogo.png'; // Adjust the path as necessary
import '../assets/styles/components-css/about.css'; // Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      {/* Church Logo at the top of the page */}
      <div className="about-header">
        <img 
          src={ChurchLogo} 
          alt="Church Logo" 
          className="church-logo"
        />
        <p className="logo-caption">
          Our main church building in Lagos, Nigeria.
        </p>
      </div>
      
      <h1 className="about-title">About Us</h1>
      <p className="about-intro">Learn about our history, mission, and leadership.</p>

      <section className="about-section">
        <h2>Our History</h2>
        <p>
          Deeper Christian Life Ministry was founded in 1973 by Pastor W. F. Kumuyi. 
          Over the years, the ministry has grown to reach millions of people around 
          the world through its teaching, preaching, and outreach programs.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to proclaim the Gospel of Jesus Christ and to spread the message of holiness 
          and Christian living. We are dedicated to helping individuals grow in their faith and 
          build a closer relationship with God.
        </p>
      </section>

      <section className="about-section">
        <h2>Leadership</h2>
        <p>
          The ministry is led by Pastor W. F. Kumuyi, who has been at the forefront of the Christian 
          faith, teaching biblical truths and living a life dedicated to the service of God. Our leadership 
          team is committed to guiding the church with integrity, compassion, and a vision for the future.
        </p>
        <p>
          In the UK, Pastor Amos Fanimo serves as the Regional Overseer for the Suffolk Region and is also 
          the pastor for the Ipswich Church.
        </p>
      </section>

      <section className="about-section">
        <h2>What We Believe</h2>
        <p>
          We believe in the power of the Gospel to transform lives. We hold fast to the fundamental teachings 
          of the Bible, emphasizing the need for personal holiness, faith in Christ, and a commitment to 
          spreading the Good News to all corners of the earth.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Core Doctrines and Beliefs</h2>
        <p>
          At Deeper Christian Life Ministry, we hold to the following core doctrines and beliefs:
        </p>
        <ul className="doctrines-list">
          <li><strong>The Bible:</strong> We believe in the divine inspiration and authority of the Scriptures.</li>
          <li><strong>The Godhead:</strong> We believe in one God, eternally existing in three persons: the Father, the Son, and the Holy Spirit.</li>
          <li><strong>Salvation:</strong> We believe in salvation by grace through faith in Jesus Christ alone.</li>
          <li><strong>Repentance and Faith:</strong> We believe that all must repent of their sins and accept Jesus Christ as their Lord and Savior.</li>
          <li><strong>Holiness:</strong> We believe that without holiness, no one shall see the Lord.</li>
          <li><strong>Water Baptism and Lord's Supper:</strong> We believe in the ordinances of water baptism by immersion and the Lord’s Supper.</li>
          <li><strong>Holy Spirit Baptism:</strong> We believe in the baptism of the Holy Spirit with the evidence of speaking in tongues.</li>
          <li><strong>The Church:</strong> We believe the Church is the body of Christ, made up of born-again believers.</li>
          <li><strong>Marriage:</strong> We believe in marriage as a holy union between one man and one woman.</li>
          <li><strong>Eternal Life and Judgment:</strong> We believe in eternal life for the righteous and eternal judgment for the wicked.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Join Us</h2>
        <p>
          Whether you are new to the faith or looking to deepen your relationship with God, we welcome 
          you to join us in our services, Bible studies, and community outreach programs. Together, 
          we can grow in faith and serve God with all our hearts.
        </p>
      </section>

      <section className="location">
        <h2>Location</h2>
        <p>Join us at our Ipswich Church located at:</p>
        <p>17 Black Horse Lane, Ipswich, IP1 2E</p>
        <div className="map-container">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.586476088816!2d1.1571213156118554!3d52.05203667965785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47cc7f2b0a9d6119%3A0x15ec0e82b11c3b7e!2s17%20Black%20Horse%20Ln%2C%20Ipswich%20IP1%202EJ%2C%20UK!5e0!3m2!1sen!2sus!4v1636318465047!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <p>You can also find our services on Google Calendar <a href="YOUR_GOOGLE_CALENDAR_LINK" target="_blank" rel="noopener noreferrer">here</a>.</p>
      </section>
    </div>
  );
};

export default About;
