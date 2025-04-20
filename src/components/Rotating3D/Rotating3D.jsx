import React from 'react';
import './CSS/Rotating3D.css';

const Rotating3D = ({ videoUrl, title, description }) => {
  return (
    <div className="circle-video-heading-container">
      <div className="circle-video">
        <video autoPlay loop muted playsInline>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="text-content">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Rotating3D;

