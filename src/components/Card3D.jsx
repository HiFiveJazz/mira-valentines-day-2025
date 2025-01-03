import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import confetti from 'canvas-confetti';
import '../CSS/Card3D.css';

const Card3D = ({ imageUrl, title, description, selected, blurred, onClick }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    // Initialize VanillaTilt
    const currentCard = cardRef.current;
    VanillaTilt.init(currentCard, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    });

    return () => {
      // Cleanup VanillaTilt
      if (currentCard.vanillaTilt) {
        currentCard.vanillaTilt.destroy();
      }
    };
  }, []);

  const handleClick = () => {
    if (!blurred) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          x: cardRef.current.getBoundingClientRect().x / window.innerWidth + 0.1,
          y: cardRef.current.getBoundingClientRect().y / window.innerHeight + 0.1,
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

