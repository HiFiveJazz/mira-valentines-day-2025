import { useEffect, useState } from 'react';
import Card3D from '../Card3D/Card3D';
import './CSS/DateSelector.css';
import locations from './locations';

const getInitialSelection = () => {
  try {
    const savedData = JSON.parse(
      localStorage.getItem('selectionData'),
    );

    if (
      savedData &&
      Array.isArray(savedData.locations) &&
      Number.isInteger(savedData.index)
    ) {
      return {
        locations: savedData.locations,
        selectedCard: savedData.index,
        confettiTriggered: true,
      };
    }
  } catch (error) {
    console.error('Failed to restore selection:', error);
    localStorage.removeItem('selectionData');
  }

  return {
    locations: locations.slice(0, 3),
    selectedCard: null,
    confettiTriggered: false,
  };
};

const DateSelector = () => {
  const [initialSelection] = useState(getInitialSelection);

  const [displayedLocations, setDisplayedLocations] = useState(
    initialSelection.locations,
  );
  const [selectedCard, setSelectedCard] = useState(
    initialSelection.selectedCard,
  );
  const [confettiTriggered, setConfettiTriggered] = useState(
    initialSelection.confettiTriggered,
  );
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [notification, setNotification] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  useEffect(() => {
    document.body.style.overflow = confirmCancel
      ? 'hidden'
      : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [confirmCancel]);

  const saveStateToLocalStorage = (
    index,
    currentLocations,
  ) => {
    const selectionData = {
      index,
      locations: currentLocations,
    };

    localStorage.setItem(
      'selectionData',
      JSON.stringify(selectionData),
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setNotification('Copied Address to Clipboard!');

        setTimeout(() => {
          setNotification('');
        }, 3000);
      })
      .catch((error) => {
        console.error(
          'Failed to copy to clipboard:',
          error,
        );
      });
  };

  const handleCardClick = (index) => {
    if (selectedCard === index) {
      if (!confirmCancel) {
        setConfirmCancel(true);
      }

      return;
    }

    const selectedLocation = displayedLocations[index];

    copyToClipboard(selectedLocation.clipboard);

    setIsFadingOut(false);
    setSelectedCard(index);
    setConfettiTriggered(true);
    setConfirmCancel(false);

    saveStateToLocalStorage(
      index,
      displayedLocations,
    );
  };

  const handleCancel = () => {
    setIsFadingOut(true);

    setTimeout(() => {
      setSelectedCard(null);
      setConfettiTriggered(false);
      setConfirmCancel(false);
      setIsFadingOut(false);
      localStorage.removeItem('selectionData');
    }, 200);
  };

  const handleNo = () => {
    setConfirmCancel(false);
  };

  const handleShuffleClick = () => {
    const filteredLocations =
      selectedTag === 'All'
        ? locations
        : locations.filter((location) =>
            location.tags.includes(selectedTag),
          );

    const shuffled = [...filteredLocations].sort(
      () => Math.random() - 0.5,
    );

    setDisplayedLocations(shuffled.slice(0, 3));
    setSelectedCard(null);
    setConfettiTriggered(false);

    localStorage.removeItem('selectionData');
  };

  const isSafari =
    /^((?!chrome|android).)*safari/i.test(
      navigator.userAgent,
    );

  return (
    <div className="date-selector-container">
      <h2 className="date-selector-heading">
        Pick our next Hangout Location!
      </h2>

      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      <div className="date-selector">
        {displayedLocations.map(
          (location, index) => (
            <Card3D
              key={
                isSafari
                  ? `${index}-${selectedCard}`
                  : index
              }
              imageUrl={location.imageUrl}
              title={location.title}
              description={location.description}
              tags={location.tags}
              selected={selectedCard === index}
              blurred={
                selectedCard !== null &&
                selectedCard !== index
              }
              confettiDisabled={confettiTriggered}
              disableConfetti={false}
              onClick={() => handleCardClick(index)}
            />
          ),
        )}
      </div>

      <button
        type="button"
        className={`shuffle-button ${
          selectedCard !== null ? 'disabled' : ''
        }`}
        onClick={handleShuffleClick}
        disabled={selectedCard !== null}
      >
        Shuffle Locations
      </button>

      <select
        className="tag-filter"
        value={selectedTag}
        onChange={(event) =>
          setSelectedTag(event.target.value)
        }
      >
        <option value="" disabled>
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
        <div
          className={`popup ${
            isFadingOut ? 'hide' : 'show'
          }`}
        >
          <p>
            Are you sure you want to cancel your
            selection?
          </p>

          <button
            type="button"
            onClick={handleNo}
          >
            No
          </button>

          <button
            type="button"
            onClick={handleCancel}
          >
            Yes
          </button>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
