import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you're using react-router-dom
import './Button.css';

const Button = ({ text, target }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(target); // Use the target prop for navigation
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <div className="button-container">
      <button className="homepage-button" onClick={handleClick}>
        {text} {/* Use the text prop for button text */}
      </button>
    </div>
  );
};

export default Button;

