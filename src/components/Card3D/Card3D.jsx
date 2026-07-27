import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const currentCard = cardRef.current;
    const hasFinePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches;

    if (!currentCard || !hasFinePointer) {
      return;
    }

    let tiltInstance;
    let cancelled = false;

    import('vanilla-tilt')
      .then(({ default: VanillaTilt }) => {
        if (cancelled) {
          return;
        }

        VanillaTilt.init(currentCard, {
          max: 25,
          speed: 400,
          glare: true,
          'max-glare': 0.5,
          gyroscope: false,
        });

        tiltInstance = currentCard.vanillaTilt;
      })
      .catch((error) => {
        console.error('Failed to load card tilt:', error);
      });

    return () => {
      cancelled = true;
      tiltInstance?.destroy();
    };
  }, []);

  const handleClick = () => {
    const shouldLaunchConfetti =
      !blurred &&
      !confettiDisabled &&
      !disableConfetti;

    const cardRect = shouldLaunchConfetti
      ? cardRef.current?.getBoundingClientRect()
      : null;

    // Do not delay the card selection while confetti downloads.
    onClick?.();

    if (!cardRect) {
      return;
    }

    import('canvas-confetti')
      .then(({ default: confetti }) => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: {
            x:
              (cardRect.left + cardRect.width / 2) /
              window.innerWidth,
            y:
              (cardRect.top + cardRect.height / 2) /
              window.innerHeight,
          },
        });
      })
      .catch((error) => {
        console.error('Failed to load confetti:', error);
      });
  };

  const isWeatherImage = imageUrl.includes(
    'openweathermap.org',
  );

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
          backgroundColor: isWeatherImage
            ? '#000'
            : '#9c1112',
          backgroundSize: isWeatherImage
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
