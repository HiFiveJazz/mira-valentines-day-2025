import { useEffect, useRef, useState } from 'react';
import './CSS/LoveLetter.css';

const LoveLetter = () => {
  const letterRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const letter = letterRef.current;

    if (!letter) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
      },
    );

    observer.observe(letter);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div
      ref={letterRef}
      className={`envelope-container ${isVisible ? 'visible' : 'hidden'}`}
    >
      <div className="envelope" onClick={handleOpen}>
        <div className={`back ${isOpen ? 'open' : ''}`}>
          <div className={`letter ${isOpen ? 'open' : ''}`}>
            <div className="heart" />
            <div className="text">
              <p>Happy 1 Month :)</p>
            </div>
          </div>

          <div className={`front ${isOpen ? 'open' : ''}`} />
          <div className={`envelope-top ${isOpen ? 'open' : ''}`} />
          <div className="shadow" />
          <div className="text1" />
        </div>
      </div>
    </div>
  );
};

export default LoveLetter;
