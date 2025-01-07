import React from 'react';
import './CircleImageHeading.css';

const CircleImageHeading = ({ imageUrl, title, description }) => {
  return (
    <div className="circle-image-heading-container">
      <div className="circle-image">
        <img src={imageUrl} alt="Circle" />
      </div>
      <div className="text-content">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CircleImageHeading;

