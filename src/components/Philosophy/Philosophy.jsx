// Philosophy.jsx
import React, { useState, useEffect } from 'react';
import './CSS/Philosophy.css';

const Philosophy = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="philosophy-overlay-wrapper">
      <div className="philosophy">
        {/* BOX 1 */}
        <div className="intro-box">
          <p className="philosophy-intro">PHILOSOPHY</p>
          <div className="text">
            <h1>Self Improvement</h1>
            <p>
 blossoms when you commit to learning new skills and courageously step beyond your comfort zone. I dedicated several months to creating this website, embarking on a journey in web development and UI/UX design without any prior experience. This process taught me that with genuine curiosity, focused research, and steadfast persistence, any challenge can be transformed into an opportunity for growth. May this site serve as both a testament to the power of transformation and an invitation for you to launch your next project with confidence. 
            </p>
          </div>
        </div>

        {/* BOX 2 */}
        <div className="second-box">
          <div className="text">
            <h1>Cultivating Authentic Connections </h1>
            <p>
has always been at the heart of my work. This website is more than just a digital space—it’s a gentle expression of my desire to share life's subtle moments with close friends in Minnesota and cherished family across the oceans. In a world where time and distance often keep us apart, I find solace in those quiet, unspoken bonds that nourish the soul. Each visit, every shared story, is a step toward an ideal life defined by genuine, reflective connection, and this site is one of my many heartfelt stepping stones on that journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Philosophy;

