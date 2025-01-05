import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you're using react-router-dom
import './Button.css';

const Button = () => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/relationship-recap'); 
  };

  return (
    <div className="button-container">
      <button className="get-started-button" onClick={handleClick}>
        Get Started
      </button>
    </div>
  );
};

export default Button;

