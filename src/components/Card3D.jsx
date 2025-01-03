import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import confetti from 'canvas-confetti';
import '../CSS/Card3D.css';

const Card3D = ({
  imageUrl,
  title,
  description,
  selected,
  blurred,
  onClick,
  confettiDisabled,
}) => {
  const cardRef = useRef(null);
  let startX = 0; // Track initial touch X position
  let startY = 0; // Track initial touch Y position

  useEffect(() => {
    // Initialize VanillaTilt for desktop hover
    const currentCard = cardRef.current;
    VanillaTilt.init(currentCard, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    });

    // Add touch event listeners for mobile
    const handleTouchStart = (event) => {
      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      const rect = currentCard.getBoundingClientRect();
      const x = ((touch.clientX - startX) / rect.width) * 100;
      const y = ((touch.clientY - startY) / rect.height) * 100;

      currentCard.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
    };

    const handleTouchEnd = () => {
      // Reset card to original position after touch ends
      currentCard.style.transform = '';
    };

    currentCard.addEventListener('touchstart', handleTouchStart);
    currentCard.addEventListener('touchmove', handleTouchMove);
    currentCard.addEventListener('touchend', handleTouchEnd);

    // Cleanup listeners
    return () => {
      currentCard.removeEventListener('touchstart', handleTouchStart);
      currentCard.removeEventListener('touchmove', handleTouchMove);
      currentCard.removeEventListener('touchend', handleTouchEnd);

      if (currentCard.vanillaTilt) {
        currentCard.vanillaTilt.destroy();
      }
    };
  }, []);

  const handleClick = () => {
    if (!blurred && !confettiDisabled) {
      const rect = cardRef.current.getBoundingClientRect();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
      });

      if (onClick) {
        onClick();
      }
    }
  };

  return (
    <div
      className={`card ${blurred ? 'blurred' : ''} ${selected ? 'selected' : ''}`}
      ref={cardRef}
      onClick={handleClick}
    >
      <div
        className="card-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="card-text">
        <div className="date">
          <h2>{title}</h2>
        </div>
        <p>{description}</p>
      </div>
      <div className="card-stats"></div>
    </div>
  );
};

export default Card3D;

