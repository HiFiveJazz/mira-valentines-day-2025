import { useEffect, useRef, useState, useMemo } from 'react';
import "./CSS/FallingItem.css";

function getFallingTheme(date = new Date()) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const isLunarNewYear =
    (month === 1 && day >= 20) || (month === 2 && day <= 23);
  const isStPatricks = month === 3 && day >= 1 && day <= 17;
  const isHalloween = month === 10;
  const isThanksgiving = month === 11;
  const isChristmas = month === 12 || month === 1;

  // All assets now in /public/seasonal/

  if (isStPatricks) {
    return {
      src: "/seasonal/clover.webp",
      key: "stpatricks",
      vars: { "--fall-size": "125px", "--fall-brightness": "0.9" },
    };
  }

  if (isHalloween) {
    return {
      src: "/seasonal/candy-corn.webp",
      key: "halloween",
      vars: { "--fall-size": "80px", "--fall-brightness": "1.2" },
    };
  }

  if (isLunarNewYear) {
    return {
      src: "/seasonal/lantern.webp",
      key: "lunar",
      vars: { "--fall-size": "250px", "--fall-brightness": "0.7" },
    };
  }

  if (isChristmas) {
    return {
      src: "/seasonal/snowflake.webp",
      key: "christmas",
      vars: { "--fall-size": "105px", "--fall-brightness": "1.0" },
    };
  }

  if (isThanksgiving) {
    return {
      src: "/seasonal/thanksgiving.webp",
      key: "thanksgiving",
      vars: { "--fall-size": "130px", "--fall-brightness": "1.0" },
    };
  }

  return {
    src: "/seasonal/heart.webp",
    key: "default",
    vars: { "--fall-size": "100px", "--fall-brightness": "0.4" },
  };
}

const FallingItem = () => {
  const [isVisible, setIsVisible] = useState(false);
  const fallingItemRef = useRef(null);

  const theme = useMemo(() => getFallingTheme(new Date()), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.7 }
    );

    const el = fallingItemRef.current;
    if (el) observer.observe(el);

    return () => el && observer.unobserve(el);
  }, []);

  if (!isVisible) {
    return (
      <div
        className={`falling-objects theme-${theme.key}`}
        ref={fallingItemRef}
        style={theme.vars}
      />
    );
  }

  return (
    <div
      className={`falling-objects is-visible theme-${theme.key}`}
      ref={fallingItemRef}
      style={theme.vars}
    >
      <div className="objects">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <img src={theme.src} alt="Falling Object" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FallingItem;
