import React, { useState, useEffect, useRef } from 'react';
import './CardSlider.css';

const CardSlider = ({ images, title }) => {
  const [active, setActive] = useState(3);
  const [touchStart, setTouchStart] = useState(null);
  const sliderRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const autoScrollInterval = useRef(null);
  const manualControlTimeout = useRef(null);

  // Stop auto-scroll after user interaction
  const stopAutoScroll = () => {
    clearInterval(autoScrollInterval.current);
    clearTimeout(manualControlTimeout.current);
    manualControlTimeout.current = setTimeout(() => {
      if (isVisible) {
        autoScrollInterval.current = setInterval(handleNext, 3000);
      }
    }, 2000); // Resume auto-scroll after 5 seconds of inactivity
  };

  // Handle visibility of the carousel
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.5 }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (isVisible) {
      autoScrollInterval.current = setInterval(() => {
        handleNext();
      }, 3000); // Change slide every 3 seconds
    } else {
      clearInterval(autoScrollInterval.current);
    }

    return () => {
      clearInterval(autoScrollInterval.current);
    };
  }, [isVisible]);

  const handleTouchStart = (e) => {
    stopAutoScroll();
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStart === null) return;

    const currentTouch = e.targetTouches[0].clientX;
    const swipeDistance = touchStart - currentTouch;
    const swipeThreshold = 60;

    if (swipeDistance > swipeThreshold) {
      handleNext();
      setTouchStart(currentTouch);
    } else if (swipeDistance < -swipeThreshold) {
      handlePrev();
      setTouchStart(currentTouch);
    }
  };

  const loadShow = () => {
    return images.map((item, index) => {
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
  };

  const renderedItems = loadShow();

  const handleNext = () => {
    stopAutoScroll();
    setActive((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    stopAutoScroll();
    setActive((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      ref={sliderRef}
      className={`slider-container ${isVisible ? 'fade-in' : 'fade-out'}`}
    >
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

