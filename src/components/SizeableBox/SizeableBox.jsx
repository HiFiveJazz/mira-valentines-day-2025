import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const currentCard = cardRef.current;
    VanillaTilt.init(currentCard, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    });

    return () => {
      if (currentCard.vanillaTilt) {
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

