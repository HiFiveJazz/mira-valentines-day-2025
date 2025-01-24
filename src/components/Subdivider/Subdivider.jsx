import React, { useEffect, useRef, useState } from 'react';
import './CSS/Subdivider.css';

const Subdivider = ({ title }) => {
  const dividerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.7, // Trigger when 10% of the element is visible
      }
    );

    if (dividerRef.current) {
      observer.observe(dividerRef.current);
    }

    return () => {
      if (dividerRef.current) {
        observer.unobserve(dividerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`subdivider-container ${isVisible ? 'visible' : 'hidden'}`}
      ref={dividerRef}
    >
      <div className="subdivider-content">
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Subdivider;

