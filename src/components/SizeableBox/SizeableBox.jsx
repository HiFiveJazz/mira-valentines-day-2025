import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import './CSS/SizeableBox.css';

const SizeableBox = ({
  type, // Determines the box type: 'image', 'text', or 'video'
  imageUrl,
  videoUrl,
  title,
  description,
  onClick,
  height = '300px',
  width = '300px',
  autoplay = true, // Default: autoplay videos
  loop = true, // Default: loop videos
}) => {
  const cardRef = useRef(null);

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
            height: '100%',
            width: '100%',
            borderRadius: 'inherit',
          }}
        ></div>
      )}

      {type === 'video' && (
        <video
          className="box-video"
          src={videoUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures no black bars
            borderRadius: "inherit",
          }}
          autoPlay
          loop
          muted
          playsInline
        />
      )}

      {type === 'text' && (
        <div className="box-text" style={{ height: '100%' }}>
          <div className="box-title">
            <h2>{title}</h2>
          </div>
          <div className="box-description">
            {description}
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeableBox;

