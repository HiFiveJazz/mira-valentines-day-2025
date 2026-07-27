import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import './CardSlider.css';

const AUTO_SCROLL_DELAY = 3000;
const RESUME_DELAY = 2000;
const SWIPE_THRESHOLD = 40;
const RENDER_DISTANCE = 3;
const VISIBLE_DISTANCE = 2;

const CardSlider = ({ images = [], title }) => {
  const [active, setActive] = useState(() =>
    Math.min(3, Math.max(images.length - 1, 0)),
  );
  const [isVisible, setIsVisible] = useState(false);

  const sliderRef = useRef(null);
  const touchStartRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const manualControlTimeoutRef = useRef(null);

  const imageCount = images.length;

  const clearAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current !== null) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  }, []);

  const advanceNext = useCallback(() => {
    if (imageCount < 2) {
      return;
    }

    setActive((previous) => (previous + 1) % imageCount);
  }, [imageCount]);

  const advancePrevious = useCallback(() => {
    if (imageCount < 2) {
      return;
    }

    setActive(
      (previous) =>
        (previous - 1 + imageCount) % imageCount,
    );
  }, [imageCount]);

  const startAutoScroll = useCallback(() => {
    clearAutoScroll();

    if (!isVisible || imageCount < 2) {
      return;
    }

    autoScrollIntervalRef.current = setInterval(
      advanceNext,
      AUTO_SCROLL_DELAY,
    );
  }, [
    advanceNext,
    clearAutoScroll,
    imageCount,
    isVisible,
  ]);

  const pauseAfterManualControl = useCallback(() => {
    clearAutoScroll();

    if (manualControlTimeoutRef.current !== null) {
      clearTimeout(manualControlTimeoutRef.current);
    }

    manualControlTimeoutRef.current = setTimeout(() => {
      startAutoScroll();
      manualControlTimeoutRef.current = null;
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
      {
        rootMargin: '150px',
        threshold: 0.25,
      },
    );

    observer.observe(slider);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    startAutoScroll();

    return clearAutoScroll;
  }, [clearAutoScroll, startAutoScroll]);

  useEffect(() => {
    return () => {
      if (manualControlTimeoutRef.current !== null) {
        clearTimeout(manualControlTimeoutRef.current);
      }
    };
  }, []);

  const handleTouchStart = (event) => {
    pauseAfterManualControl();

    touchStartRef.current =
      event.targetTouches[0].clientX;
  };

  const handleTouchMove = (event) => {
    if (touchStartRef.current === null) {
      return;
    }

    const currentTouch =
      event.targetTouches[0].clientX;

    const swipeDistance =
      touchStartRef.current - currentTouch;

    if (swipeDistance > SWIPE_THRESHOLD) {
      handleNext();
      touchStartRef.current = currentTouch;
    } else if (
      swipeDistance < -SWIPE_THRESHOLD
    ) {
      handlePrevious();
      touchStartRef.current = currentTouch;
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
  };

  const renderedItems = useMemo(() => {
    if (imageCount === 0) {
      return [];
    }

    return images
      .map((item, index) => {
        const forwardDistance =
          (index - active + imageCount) % imageCount;

        const backwardDistance =
          forwardDistance - imageCount;

        const distance =
          Math.abs(forwardDistance) <=
          Math.abs(backwardDistance)
            ? forwardDistance
            : backwardDistance;

        return {
          ...item,
          index,
          distance,
        };
      })
      .filter(
        ({ distance }) =>
          Math.abs(distance) <= RENDER_DISTANCE,
      )
      .map((item) => {
        const { distance } = item;
        const absoluteDistance = Math.abs(distance);
        const isActive = distance === 0;
        const isWithinVisibleRange =
          absoluteDistance <= VISIBLE_DISTANCE;

        return {
          ...item,
          style: {
            transform: isActive
              ? 'none'
              : `
                  translateX(${120 * distance}px)
                  scale(${Math.max(
                    1 - 0.2 * absoluteDistance,
                    0.2,
                  )})
                  perspective(16px)
                  rotate(${1.5 * distance}deg)
                `,
            zIndex: isActive ? 1 : -absoluteDistance,
            filter: isActive
              ? 'none'
              : isWithinVisibleRange
                ? 'blur(2px)'
                : 'none',
            opacity: isActive
              ? 1
              : isWithinVisibleRange
                ? 0.6
                : 0,
            pointerEvents: isWithinVisibleRange
              ? 'auto'
              : 'none',
          },
        };
      });
  }, [active, imageCount, images]);

  if (imageCount === 0) {
    return null;
  }

  return (
    <div
      ref={sliderRef}
      className={`slider-container ${
        isVisible ? 'fade-in' : 'fade-out'
      }`}
    >
      {title && (
        <h2 className="slider-title">{title}</h2>
      )}

      <div
        className="slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {renderedItems.map((item) => (
          <div
            key={item.id}
            className="item"
            style={item.style}
            aria-hidden={item.distance !== 0}
          >
            <img
              src={item.image}
              alt={
                item.alt ??
                `${title ?? 'Gallery'} slide ${item.index + 1}`
              }
              loading={
                item.distance && item.distance === 0
                  ? 'eager'
                  : 'lazy'
              }
              fetchPriority={
                isVisible && item.distance === 0
                  ? 'high'
                  : 'auto'
              }
              decoding="async"
              draggable="false"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                objectFit: 'cover',
              }}
            />
          </div>
        ))}

        {imageCount > 1 && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default CardSlider;
