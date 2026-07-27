import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import './CardSlider.css';

const AUTO_SCROLL_DELAY = 3000;
const RESUME_DELAY = 2000;

const CardSlider = ({ images, title }) => {
  const [active, setActive] = useState(3);
  const [touchStart, setTouchStart] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const sliderRef = useRef(null);
  const autoScrollInterval = useRef(null);
  const manualControlTimeout = useRef(null);

  const advanceNext = useCallback(() => {
    setActive((previous) => (previous + 1) % images.length);
  }, [images.length]);

  const advancePrevious = useCallback(() => {
    setActive(
      (previous) =>
        (previous - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const clearAutoScroll = useCallback(() => {
    clearInterval(autoScrollInterval.current);
    autoScrollInterval.current = null;
  }, []);

  const startAutoScroll = useCallback(() => {
    clearAutoScroll();

    if (!isVisible || images.length < 2) {
      return;
    }

    autoScrollInterval.current = setInterval(
      advanceNext,
      AUTO_SCROLL_DELAY,
    );
  }, [
    advanceNext,
    clearAutoScroll,
    images.length,
    isVisible,
  ]);

  const pauseAfterManualControl = useCallback(() => {
    clearAutoScroll();
    clearTimeout(manualControlTimeout.current);

    manualControlTimeout.current = setTimeout(() => {
      startAutoScroll();
    }, RESUME_DELAY);
  }, [clearAutoScroll, startAutoScroll]);

  const handleNext = useCallback(() => {
    pauseAfterManualControl();
    advanceNext();
  }, [advanceNext, pauseAfterManualControl]);

  const handlePrevious = useCallback(() => {
    pauseAfterManualControl();
    advancePrevious();
  }, [advancePrevious, pauseAfterManualControl]);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 },
    );

    observer.observe(slider);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    startAutoScroll();

    return () => {
      clearAutoScroll();
    };
  }, [clearAutoScroll, startAutoScroll]);

  useEffect(() => {
    return () => {
      clearInterval(autoScrollInterval.current);
      clearTimeout(manualControlTimeout.current);
    };
  }, []);

  const handleTouchStart = (event) => {
    pauseAfterManualControl();
    setTouchStart(event.targetTouches[0].clientX);
  };

  const handleTouchMove = (event) => {
    if (touchStart === null) {
      return;
    }

    const currentTouch = event.targetTouches[0].clientX;
    const swipeDistance = touchStart - currentTouch;
    const swipeThreshold = 40;

    if (swipeDistance > swipeThreshold) {
      handleNext();
      setTouchStart(currentTouch);
    } else if (swipeDistance < -swipeThreshold) {
      handlePrevious();
      setTouchStart(currentTouch);
    }
  };

  const renderedItems = images.map((item, index) => {
    let style;

    if (index === active) {
      style = {
        transform: 'none',
        zIndex: 1,
        filter: 'none',
        opacity: 1,
      };
    } else if (index > active) {
      const distance = index - active;

      style = {
        transform: `
          translateX(${120 * distance}px)
          scale(${1 - 0.2 * distance})
          perspective(16px)
          rotate(${1.5 * distance}deg)
        `,
        zIndex: -distance,
        filter: 'blur(5px)',
        opacity: distance > 2 ? 0 : 0.6,
      };
    } else {
      const distance = active - index;

      style = {
        transform: `
          translateX(${-120 * distance}px)
          scale(${1 - 0.2 * distance})
          perspective(16px)
          rotate(${-1.5 * distance}deg)
        `,
        zIndex: -distance,
        filter: 'blur(5px)',
        opacity: distance > 2 ? 0 : 0.6,
      };
    }

    return {
      ...item,
      style,
    };
  });

  return (
    <div
      ref={sliderRef}
      className={`slider-container ${
        isVisible ? 'fade-in' : 'fade-out'
      }`}
    >
      {title && <h2 className="slider-title">{title}</h2>}

      <div
        className="slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {renderedItems.map((item) => (
          <div
            key={item.id}
            className="item"
            style={item.style}
          >
            <img
              src={item.image}
              alt={`Slide ${item.id}`}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                objectFit: 'cover',
              }}
            />
          </div>
        ))}

        <button
          id="prev"
          type="button"
          onClick={handlePrevious}
          aria-label="Previous slide"
        >
          {'<'}
        </button>

        <button
          id="next"
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default CardSlider;
