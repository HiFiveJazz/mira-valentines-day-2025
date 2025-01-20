import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import hash from 'object-hash';
import Card3D from './Card3D';
import '../CSS/DateSelector.css';

const DateSelector = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

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
        'Located in Balboa Park, it began as a collection of animals left over from the Panama–California Exposition.',
    },
  ];

  const currentHash = hash(locations);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('selectionData'));
    if (savedData && savedData.hash === currentHash) {
      setSelectedCard(savedData.index);
      setConfettiTriggered(true); // Prevent further confetti
    }
  }, [currentHash]);

  useEffect(() => {
    if (confirmCancel) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
    }

    return () => {
      document.body.style.overflow = ''; // Cleanup on unmount
    };
  }, [confirmCancel]);

  const sendEmail = (templateId, templateParams) => {
    emailjs
      .send('service_2dy3gsm', templateId, templateParams, '2LMXKhz6epWRPg3MK')
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
    if (selectedCard === index) {
      if (!confirmCancel) {
        setConfirmCancel(true);
      }
    } else {
      setSelectedCard(index);
      setConfettiTriggered(true);
      setConfirmCancel(false);

      const selectionData = { index, hash: currentHash };
      localStorage.setItem('selectionData', JSON.stringify(selectionData));

      const templateParams = {
        title,
        description,
        timeStamp: new Date().toLocaleString(),
        browserInfo: navigator.userAgent,
      };
      sendEmail('template_jik1mne', templateParams);
    }
  };

  const handleCancel = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      const selectedLocation = locations[selectedCard];
      const templateParams = {
        title: selectedLocation.title,
        timeStamp: new Date().toLocaleString(),
        browserInfo: navigator.userAgent,
      };
      sendEmail('template_t07eubq', templateParams);
      setSelectedCard(null);
      setConfettiTriggered(false);
      setConfirmCancel(false);
      setIsFadingOut(false);
      localStorage.removeItem('selectionData');
      console.log(`Date at ${selectedLocation.title} canceled.`);
    }, 500);
  };

  const handleNo = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setConfirmCancel(false);
      setIsFadingOut(false);
    }, 500);
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
            disableConfetti={false}
            onClick={() => handleCardClick(index, location.title, location.description)}
          />
        ))}
      </div>
      {confirmCancel && (
        <div className={`popup ${isFadingOut ? 'hide' : 'show'}`}>
          <p>Are you sure you want to cancel your selection?</p>
          <button onClick={handleNo}>No</button>
          <button
            onClick={() => {
              const selectedLocation = locations[selectedCard];
              handleCancel(selectedLocation.title);
            }}
          >
            Yes
          </button>
        </div>
      )}
    </div>
  );
};

export default DateSelector;

