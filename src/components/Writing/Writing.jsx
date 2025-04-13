import React from 'react';
import Typewriter from 'typewriter-effect';
import './CSS/Writing.css';

const Writing = () => {
  return (
    <div className="writing-container">
      <h1 className="writing-header">
        Every Photo 
      </h1>
      <h2 className='writing-header-sub'>
        <span className="highlight">Tells a Story!</span>
      </h2>
      <div className="writing-subtext">
        <span>Give</span>
        <Typewriter
          options={{
            strings: [
              ' Kindness',
              ' Care',
              ' Love',
              ' Affection',
              ' Passion',
              ' Admiration',
              ' Compassion',
              ' Appreciation',
              ' Support :)',
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 'natural',
            pauseFor: 1000,
          }}
        />
      </div>
    </div>
  );
};

export default Writing;
