import React, { useState } from 'react';

const CardSlider = ({ images, title }) => {
  const [active, setActive] = useState(3);
  const [touchStart, setTouchStart] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX); // Record the starting touch position
  };

  const handleTouchMove = (e) => {
    if (touchStart === null) return; // Ignore move events without a start point

    const currentTouch = e.targetTouches[0].clientX; // Current touch position
    const swipeDistance = touchStart - currentTouch; // Calculate swipe distance
    const swipeThreshold = 60; // Minimum swipe distance to trigger navigation

    if (swipeDistance > swipeThreshold) {
      handleNext(); // Trigger next slide
      setTouchStart(currentTouch); // Update start position to avoid repeated triggers
    } else if (swipeDistance < -swipeThreshold) {
      handlePrev(); // Trigger previous slide
      setTouchStart(currentTouch); // Update start position to avoid repeated triggers
    }
  };

  const loadShow = () => {
    const newItems = images.map((item, index) => {
      let style = {};
      if (index === active) {
        style = {
          transform: 'none',
          zIndex: 1,
          filter: 'none',
          opacity: 1,
        };
      } else if (index > active) {
        const stt = index - active;
        style = {
          transform: `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotate(${1.5 * stt}deg)`,
          zIndex: -stt,
          filter: 'blur(5px)',
          opacity: stt > 2 ? 0 : 0.6,
        };
      } else if (index < active) {
        const stt = active - index;
        style = {
          transform: `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotate(${-1.5 * stt}deg)`,
          zIndex: -stt,
          filter: 'blur(5px)',
          opacity: stt > 2 ? 0 : 0.6,
        };
      }
      return { ...item, style };
    });
    return newItems;
  };

  const renderedItems = loadShow();

  const handleNext = () => {
    setActive((prev) => (prev + 1) % images.length); // Loop to the beginning
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + images.length) % images.length); // Loop to the end
  };

  return (
    <div className="slider-container">
      {title && <h2 className="slider-title">{title}</h2>}
      <div
        className="slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {renderedItems.map((item) => (
          <div key={item.id} className="item" style={item.style}>
            <img
              src={item.image}
              alt={`Slide ${item.id}`}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
        <button id="prev" onClick={handlePrev}>
          {'<'}
        </button>
        <button id="next" onClick={handleNext}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default CardSlider;

