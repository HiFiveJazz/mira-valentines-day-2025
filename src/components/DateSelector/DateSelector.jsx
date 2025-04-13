import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Card3D from '../Card3D/Card3D';
import './CSS/DateSelector.css';
import locations from './locations';

const DateSelector = () => {
  const [displayedLocations, setDisplayedLocations] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [notification, setNotification] = useState("");
  const [selectedTag, setSelectedTag] = useState("All"); // State for filtering by tag

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('selectionData'));
    if (savedData) {
      setDisplayedLocations(savedData.locations);
      setSelectedCard(savedData.index);
      setConfettiTriggered(true);
    } else {
      const initialLocations = locations.slice(0, 3);
      setDisplayedLocations(initialLocations);
    }
  }, []);

  useEffect(() => {
    if (confirmCancel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
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
    navigator.clipboard.writeText(text)
      .then(() => {
        setNotification("Copied Address to Clipboard!");
        setTimeout(() => setNotification(""), 3000);
      })
      .catch((err) => console.error("Failed to copy to clipboard:", err));
  };

  const handleCardClick = (index, title, description) => {
    if (selectedCard === index) {
      if (!confirmCancel) {
        setConfirmCancel(true);
      }
    } else {
      const selectedLocation = displayedLocations[index];
      copyToClipboard(selectedLocation.clipboard);

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
    const filteredLocations =
      selectedTag === "All"
        ? locations
        : locations.filter((location) => location.tags.includes(selectedTag));
    const shuffled = [...filteredLocations].sort(() => Math.random() - 0.5);
    setDisplayedLocations(shuffled.slice(0, 3));
    setSelectedCard(null);
    localStorage.removeItem('selectionData');
  };

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <div className="date-selector-container">
      <h2 className="date-selector-heading">Pick our next Hangout Location!</h2>
      {/* <h3 className="date-selector-subheading"> */}
      {/*   Note: Message me for hangout ideas outside this! (New feature soon!) */}
      {/* </h3> */}

      {/* Tag Filter Dropdown */}

      {notification && <div className="notification">{notification}</div>}

      <div className="date-selector">
        {displayedLocations.map((location, index) => (
          <Card3D
            key={isSafari ? `${index}-${selectedCard}` : index}
            imageUrl={location.imageUrl}
            title={location.title}
            description={location.description}
            tags={location.tags}
            selected={selectedCard === index}
            blurred={selectedCard !== null && selectedCard !== index}
            confettiDisabled={confettiTriggered}
            disableConfetti={false}
            onClick={() => handleCardClick(index, location.title, location.description)}
          />
        ))}
      </div>

      <button
        className={`shuffle-button ${selectedCard !== null ? 'disabled' : ''}`}
        onClick={() => {
          if (selectedCard === null) {
            handleShuffleClick();
          } else {
            setConfirmCancel(true);
          }
        }}
        disabled={selectedCard !== null}
      >
        Shuffle Locations
      </button>
      <select
        className="tag-filter"
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
      >
        <option value=""disabled>
          Filter by 
        </option>
        <option value="All">All</option>
        <option value="San Diego">San Diego</option>
        <option value="Riverside">Riverside</option>
        <option value="Hangout">Hangout</option>
        <option value="Nature">Nature</option>
        <option value="Shopping">Shopping</option>
        <option value="Food">Food</option>
        <option value="Hiking">Hiking</option>
      </select>

      {confirmCancel && (
        <div className={`popup ${isFadingOut ? 'hide' : 'show'}`}>
          <p>Are you sure you want to cancel your selection?</p>
          <button onClick={handleNo}>No</button>
          <button onClick={handleCancel}>Yes</button>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
