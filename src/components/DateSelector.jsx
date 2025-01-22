import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import hash from 'object-hash';
import Card3D from './Card3D';
import '../CSS/DateSelector.css';
import locations from './locations';

const DateSelector = () => {
  const [displayedLocations, setDisplayedLocations] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('selectionData'));
    if (savedData) {
      setDisplayedLocations(savedData.locations);
      setSelectedCard(savedData.index);
      setConfettiTriggered(true); // Keep the confetti disabled for a previously selected card
    } else {
      const initialLocations = locations.slice(0, 3);
      setDisplayedLocations(initialLocations);
    }
  }, []);

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

  const saveStateToLocalStorage = (index, displayedLocations) => {
    const selectionData = { index, locations: displayedLocations };
    localStorage.setItem('selectionData', JSON.stringify(selectionData));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setNotification(`Copied Address to Clipboard!`);
      setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
    }).catch((err) => {
      console.error("Failed to copy to clipboard:", err);
    });
  };

  const handleCardClick = (index, title, description) => {
    if (selectedCard === index) {
      if (!confirmCancel) {
        setConfirmCancel(true);
      }
    } else {
      const selectedLocation = displayedLocations[index];
      copyToClipboard(selectedLocation.clipboard); // Copy clipboard value on click

      setIsFadingOut(false);
      setSelectedCard(index);
      setConfettiTriggered(true);
      setConfirmCancel(false);
      saveStateToLocalStorage(index, displayedLocations);

      const templateParams = {
        title,
        description,
        timeStamp: new Date().toLocaleString(),
        browserInfo: navigator.userAgent,
      };
      // sendEmail('template_jik1mne', templateParams);
    }
  };

  const handleCancel = () => {
    setIsFadingOut(true);
    const selectedLocation = displayedLocations[selectedCard];
    const templateParams = {
      title: selectedLocation.title,
      timeStamp: new Date().toLocaleString(),
      browserInfo: navigator.userAgent,
    };
    // sendEmail('template_t07eubq', templateParams);
    setSelectedCard(null);
    setConfettiTriggered(false);
    setConfirmCancel(false);
    setIsFadingOut(false);
    localStorage.removeItem('selectionData');
  };

  const handleNo = () => {
    setIsFadingOut(true);
    setConfirmCancel(false);
    setIsFadingOut(false);
  };

  const handleShuffleClick = () => {
    const shuffled = [...locations].sort(() => Math.random() - 0.5);
    const newDisplayedLocations = shuffled.slice(0, 3);
    setDisplayedLocations(newDisplayedLocations);
    setSelectedCard(null); // Reset selected card
    localStorage.removeItem('selectionData'); // Clear previous saved state
  };

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <div className="date-selector-container">
      <h2 className="date-selector-heading">Pick our next Date Location!</h2>
      <h3 className="date-selector-subheading">
        Note: Message me for date ideas outside this! (New feature soon!)
      </h3>
      <button
        className={`shuffle-button ${selectedCard !== null ? 'disabled' : ''}`}
        onClick={() => {
          if (selectedCard === null) {
            handleShuffleClick();
          } else {
            setConfirmCancel(true); // Show the popover if selection exists
          }
        }}
        disabled={selectedCard !== null} // Disable the button if a card is selected
      >
        Shuffle Locations
      </button>
      {notification && <div className="notification">{notification}</div>} {/* Notification display */}
      <div className="date-selector">
        {displayedLocations.map((location, index) => (
          <Card3D
            key={isSafari ? `${index}-${selectedCard}` : index} // Conditional key
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
              const selectedLocation = displayedLocations[selectedCard];
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

