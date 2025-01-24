import React, { useEffect, useRef, useState } from 'react';
import './CSS/LoveLetter.css';

const LoveLetter = () => {
  const letterRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 70% of the element is visible
      }
    );

    if (letterRef.current) {
      observer.observe(letterRef.current);
    }

    return () => {
      if (letterRef.current) {
        observer.unobserve(letterRef.current);
      }
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div
      className={`envelope-container ${isVisible ? 'visible' : 'hidden'}`}
      ref={letterRef}
    >
      <div className="envelope" onClick={handleOpen}>
        <div className={`back ${isOpen ? 'open' : ''}`}>
          <div className={`letter ${isOpen ? 'open' : ''}`}>
            <div className="heart"></div>
            <div className="text">
              <p>Will you be my Valentine?</p>
            </div>
          </div>
          <div className={`front ${isOpen ? 'open' : ''}`}></div>
          <div className={`top ${isOpen ? 'open' : ''}`}></div>
          <div className="shadow"></div>
          <div className="text1"></div>
        </div>
      </div>
    </div>
  );
};

export default LoveLetter;

