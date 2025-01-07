import React from 'react';
import './Divider.css';

const Divider = ({ title }) => {
  return (
    <div className="divider-container">
      <div className="text-content">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default Divider;

