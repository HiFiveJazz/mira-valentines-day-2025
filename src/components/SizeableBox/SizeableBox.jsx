import React, { useEffect, useRef, useState } from 'react';
import VanillaTilt from 'vanilla-tilt';
import './CSS/SizeableBox.css';

const SizeableBox = ({
  type, // Determines the box type: 'image' or 'text'
  imageUrl,
  title,
  description,
  onClick,
  height = '300px',
  width = '300px',
}) => {
  const cardRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  let startX = 0; // Track initial touch X position
  let startY = 0; // Track initial touch Y position
  let scrollTimeout;

  useEffect(() => {
    const currentCard = cardRef.current;

    // Ensure the element exists before initializing VanillaTilt
    if (currentCard) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      // Initialize VanillaTilt only for non-mobile devices
      if (!isMobile) {
        VanillaTilt.init(currentCard, {
          max: 25,
          speed: 400,
          glare: true,
          'max-glare': 0.5,
          gyroscope: false, // Disable device orientation
        });
      }
    }

    // Cleanup VanillaTilt on unmount
    return () => {
      if (currentCard?.vanillaTilt) {
        currentCard.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <div
      className="box"
      ref={cardRef}
      onClick={onClick}
      style={{
        height,
        width,
      }}
    >
      {type === 'image' && (
        <div
          className="box-image"
          style={{
            backgroundImage: `url(${imageUrl})`,
            height: '100%', // Fill the entire box
            width: '100%',
            borderRadius: 'inherit',
          }}
        ></div>
      )}
      {type === 'text' && (
        <div className="box-text" style={{ height: '100%' }}>
          <div className="box-title">
            <h2>{title}</h2>
          </div>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default SizeableBox;

