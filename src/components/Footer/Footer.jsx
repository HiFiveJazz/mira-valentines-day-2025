import React, { useEffect, useRef, useState } from 'react';
import './CSS/Footer.css';

const Footer = () => {
  const dividerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();

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
      className={`footer-container ${isVisible ? 'visible' : 'hidden'}`}
      ref={dividerRef}
    >
      <div className="footer-content">
        <p>© {currentYear} Jasmeet Bhatia </p>
      </div>
    </div>
  );
};

export default Footer;

