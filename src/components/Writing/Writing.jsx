import React from 'react';
import Typewriter from 'typewriter-effect';
import './Writing.css';

const Writing = () => {
  return (
    <div className="writing-container">
      <h1 className="writing-header">
        Welcome to <span className="highlight">Our Website!</span>
      </h1>
      <p className="writing-subtext">
        Give {''}
        <Typewriter
          options={{
            strings: [' Kindness', ' Care', ' Love', ' Affection',' Passion',' Admiration',' Compassion',' Appreciation',' Support :)'],
            autoStart: true,
            loop: true,
            deleteSpeed: 'natural',
            pauseFor: 1000,
          }}
        />
      </p>
    </div>
  );
};

export default Writing;
