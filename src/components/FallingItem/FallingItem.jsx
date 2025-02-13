import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you're using react-router-dom
import './CSS/FallingItem.css';



const FallingItem = () => {
  const dividerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/valentines-day"); // Use the target prop for navigation
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

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
          <div onClick={handleClick}><img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png"/></div>
          <div onClick={handleClick}><img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png"/></div>
          <div onClick={handleClick}><img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png"/></div>
          <div onClick={handleClick}><img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png"/></div>
          <div onClick={handleClick}><img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png"/></div>
          <div onClick={handleClick}><img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png"/></div>
          <div onClick={handleClick}><img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png"/></div>
          <div onClick={handleClick}><img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png"/></div>
          <div className="click-the-hearts"><img src="./click_the_hearts.jpg"/></div>
        </div>
      </div>
  );
};

export default FallingItem;
