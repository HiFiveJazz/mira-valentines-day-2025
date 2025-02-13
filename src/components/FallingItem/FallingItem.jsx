import React, { useEffect, useRef, useState } from 'react';
import './CSS/FallingItem.css';

const FallingItem = () => {
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
      <div className="falling-objects">
        <div className="objects">
          <div><img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png"/></div>
          <div><img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png"/></div>
          <div><img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png"/></div>
          <div><img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png"/></div>
          <div><img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png"/></div>
          <div><img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png"/></div>
          <div><img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png"/></div>
          <div><img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png"/></div>
        </div>
      </div>
  );
};

export default FallingItem;

