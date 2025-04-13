import React, { useEffect, useRef, useState } from 'react';
import './CSS/FallingItem.css';

const imageSrc = '/heart.webp';

const FallingItem = () => {
  const [isVisible, setIsVisible] = useState(false);
  const fallingItemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.7, // Trigger when 70% of the element is visible.
      }
    );

    if (fallingItemRef.current) {
      observer.observe(fallingItemRef.current);
    }

    return () => {
      if (fallingItemRef.current) {
        observer.unobserve(fallingItemRef.current);
      }
    };
  }, []);

  return (
    <div className="falling-objects" ref={fallingItemRef}>
      <div className="objects">
        <div><img src={imageSrc} alt="Falling Object" /></div>
        <div><img src={imageSrc} alt="Falling Object" /></div>
        <div><img src={imageSrc} alt="Falling Object" /></div>
        <div><img src={imageSrc} alt="Falling Object" /></div>
        <div><img src={imageSrc} alt="Falling Object" /></div>
        <div><img src={imageSrc} alt="Falling Object" /></div>
        <div><img src={imageSrc} alt="Falling Object" /></div>
        <div><img src={imageSrc} alt="Falling Object" /></div>
      </div>
    </div>
  );
};

export default FallingItem;

