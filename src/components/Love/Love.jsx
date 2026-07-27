import { useEffect, useRef, useState } from 'react';
import './CSS/Love.css';

const Love = () => {
  const dividerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const divider = dividerRef.current;

    if (!divider) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.7,
      },
    );

    observer.observe(divider);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={dividerRef}
      className={`subdivider-container ${isVisible ? 'visible' : 'hidden'}`}
    >
      <div className="subdivider-content">
        <p>
          One month ago, you said yes to being mine. Every day since has been a
          gift. So today, I have one for you.
        </p>
      </div>
    </div>
  );
};

export default Love;
