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
  disableConfetti, 
  tags = [], // Default to empty array
}) => {
  const cardRef = useRef(null);
  const tagsRef = useRef(null);

  useEffect(() => {
    const currentCard = cardRef.current;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!isMobile) {
      VanillaTilt.init(currentCard, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
        gyroscope: false,
      });
    }

    return () => {
      if (currentCard && currentCard.vanillaTilt) {
        currentCard.vanillaTilt.destroy();
      }
    };
  }, []);

  const handleClick = () => {
    if (!blurred && !confettiDisabled && !disableConfetti) {
      const rect = cardRef.current.getBoundingClientRect();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
      });
    }

    if (onClick) {
      onClick();
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
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundColor: imageUrl.includes('openweathermap.org')
            ? '#000'
            : '#9c1112',
          backgroundSize: imageUrl.includes('openweathermap.org')
            ? 'contain'
            : 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <div className="card-text">
        <div className="date">
          <h2>{title}</h2>
        </div>
        <p style={{ whiteSpace: 'pre-line' }}>{description}</p>
      </div>
      <div className="card-tags" ref={tagsRef}>
        {tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      <div className="card-stats"></div>
    </div>
  );
};

export default Card3D;

