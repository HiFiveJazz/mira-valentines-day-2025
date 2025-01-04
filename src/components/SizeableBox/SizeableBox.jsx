import React, { useEffect, useRef, useState } from 'react';
import VanillaTilt from 'vanilla-tilt';
import './SizeableBox.css';

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

    // Initialize VanillaTilt for desktop hover
    VanillaTilt.init(currentCard, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    });

    // Detect scrolling
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 500); // Add 0.25s delay after scrolling stops
    };

    window.addEventListener('scroll', handleScroll);

    // Add touch event listeners for mobile
    const handleTouchStart = (event) => {
      if (isScrolling) return; // Disable tilt during scroll
      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const handleTouchMove = (event) => {
      if (isScrolling) return; // Disable tilt during scroll
      const touch = event.touches[0];
      const rect = currentCard.getBoundingClientRect();
      const x = ((touch.clientX - startX) / rect.width) * 100;
      const y = ((touch.clientY - startY) / rect.height) * 100;

      currentCard.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
    };

    const handleTouchEnd = () => {
      if (isScrolling) return; // Disable tilt during scroll
      // Reset card to original position after touch ends
      currentCard.style.transform = '';
    };

    currentCard.addEventListener('touchstart', handleTouchStart);
    currentCard.addEventListener('touchmove', handleTouchMove);
    currentCard.addEventListener('touchend', handleTouchEnd);

    // Cleanup listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      currentCard.removeEventListener('touchstart', handleTouchStart);
      currentCard.removeEventListener('touchmove', handleTouchMove);
      currentCard.removeEventListener('touchend', handleTouchEnd);

      if (currentCard.vanillaTilt) {
        currentCard.vanillaTilt.destroy();
      }
    };
  }, [isScrolling]);

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

