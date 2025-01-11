import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Card3D from './Card3D';
import '../CSS/DateSelector.css';

const DateSelector = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [confettiTriggered, setConfettiTriggered] = useState(false);

  const locations = [
    {
      imageUrl:
        'https://lh5.googleusercontent.com/p/AF1QipNVTsBYzInsgFj7vEfV1nhUrP8IOh8jidmAjGcK=w1080-h624-n-k-no',
      title: 'Birch Aquarium',
      description:
        'This aquarium serves as the public outreach center for Scripps at the UCSD, with over half a million people visiting the aquarium each year.',
    },
    {
      imageUrl:
        'https://lajollamom.com/wp-content/uploads/2018/05/la-jolla-cove-guide.jpg',
      title: 'La Jolla Cove',
      description:
        'A small cove with a beach, surrounded by cliffs! The area is protected as part of a marine reserve and is popular with swimmers and scuba divers.',
    },
    {
      imageUrl:
        'https://static01.nyt.com/images/2024/05/01/multimedia/01dc-pandas-mwbq/01dc-pandas-mwbq-videoSixteenByNineJumbo1600.jpg',
      title: 'San Diego Zoo',
      description:
        'Located in Balboa Park, it began as a collection of animals left over from the Panama–California Exposition that were brought together by Dr. Wegeforth.',
    },
  ];

  const sendEmail = (title, description) => {
    const browserInfo = navigator.userAgent;
    const timeStamp = new Date().toLocaleString();
    const templateParams = {
      title: `${title}`,
      description: `${description}`,
      timeStamp: `${timeStamp}`,
      browserInfo: `${browserInfo}`
    };

    emailjs
      .send('service_2dy3gsm', 'template_jik1mne', templateParams, '2LMXKhz6epWRPg3MK')
      .then(
        (response) => {
          console.log('Email sent successfully!', response.status, response.text);
        },
        (error) => {
          console.error('Failed to send email.', error);
        }
      );
  };


  const handleCardClick = (index, title, description) => {
    if (!confettiTriggered) {
      setSelectedCard(index);
      setConfettiTriggered(true); // Prevent further confetti
    }

    console.log(`Card clicked: ${title}`);
    console.log(`Description: ${description}`);
    sendEmail(title, description);
  };

  return (
    <div className="date-selector-container">
      <h2 className="date-selector-heading">Pick our next Date Location!</h2>
      <h3 className="date-selector-subheading">
        Note: if you don't like this selection, feel free to message me :)
      </h3>
      <div className="date-selector">
        {locations.map((location, index) => (
          <Card3D
            key={index}
            imageUrl={location.imageUrl}
            title={location.title}
            description={location.description}
            selected={selectedCard === index}
            blurred={selectedCard !== null && selectedCard !== index}
            confettiDisabled={confettiTriggered}
            onClick={() => handleCardClick(index, location.title, location.description)}
          />
        ))}
      </div>
    </div>
  );
};

export default DateSelector;

