import React, { useEffect, useRef, useState } from 'react';
import './CSS/FallingItem.css';



const FallingItem = () => {
  const dividerRef = useRef(null);
  const setIsVisible = useState(false);

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
        <div className="objects" >
          <div><img src="/heart.png"/></div>
          <div><img src="/heart.png"/></div>
          <div><img src="/heart.png"/></div>
          <div><img src="/heart.png"/></div>
          <div><img src="/heart.png"/></div>
          <div><img src="/heart.png"/></div>
          <div><img src="/heart.png"/></div>
          <div><img src="/heart.png"/></div>
          <div className="click-the-hearts"><img src="./click_the_hearts.jpg"/></div>
        </div>
      </div>
  );
};

export default FallingItem;
