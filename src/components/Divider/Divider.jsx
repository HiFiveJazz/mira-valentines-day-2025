import React, { useEffect, useRef, useState } from 'react';
import './CSS/Divider.css';

const Divider = ({ title }) => {
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
      className={`divider-container ${isVisible ? 'visible' : 'hidden'}`}
      ref={dividerRef}
    >
      <div className="divider-content">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default Divider;

