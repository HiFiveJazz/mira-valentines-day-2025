import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import confetti from 'canvas-confetti';
import './CSS/Card3D.css';

const Card3D = ({
  imageUrl,
  title,
  description,
  selected,
  blurred,
  onClick,
  confettiDisabled,
  disableConfetti,
  tags = [],
}) => {
  const cardRef = useRef(null);
  const tagsRef = useRef(null);
  const tiltInitializedRef = useRef(false);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const isMobile =
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const initializeTilt = () => {
      if (isMobile || tiltInitializedRef.current) {
        return;
      }

      VanillaTilt.init(card, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
        gyroscope: false,
        reset: true,
      });

      tiltInitializedRef.current = true;
    };

    /*
     * Initialize only when this particular card is first used.
     * Afterward VanillaTilt remains dormant whenever the mouse is not moving
     * over it.
     */
    card.addEventListener('pointerenter', initializeTilt, {
      once: true,
    });

    return () => {
      card.removeEventListener('pointerenter', initializeTilt);

      if (card.vanillaTilt) {
        card.vanillaTilt.destroy();
      }

      tiltInitializedRef.current = false;
    };
  }, []);

  const handleClick = () => {
    if (!blurred && !confettiDisabled && !disableConfetti) {
      const rect = cardRef.current.getBoundingClientRect();

      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
      });
    }

    onClick?.();
  };

  return (
    <div
      className={`card ${blurred ? 'blurred' : ''} ${
        selected ? 'selected' : ''
      }`}
      ref={cardRef}
      onClick={handleClick}
    >
      <div
        className="card-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundColor: imageUrl.includes('openweathermap.org')
            ? '#000'
            : '#9c1112',
          backgroundSize: imageUrl.includes('openweathermap.org')
            ? 'contain'
            : 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="card-text">
        <div className="date">
          <h2>{title}</h2>
        </div>

        <div
          className="description"
          style={{ whiteSpace: 'pre-line' }}
        >
          {description}
        </div>
      </div>

      <div className="card-tags" ref={tagsRef}>
        {tags.map((tag, index) => (
          <span key={`${tag}-${index}`} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="card-stats" />
    </div>
  );
};

export default Card3D;
