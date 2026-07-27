import { useEffect, useRef, useState } from 'react';
import './CSS/Divider.css';

const Divider = ({
  title,
  gradientLg = 'linear-gradient(294deg, rgb(0,0,0) 20%, rgba(200,200,200,0.3) 65%)',
  gradientMd = 'linear-gradient(294deg, rgb(255,255,0) 20%, rgba(200,200,200,0.3) 65%)',
  gradientSm = 'linear-gradient(294deg, rgb(0,128,255) 20%, rgba(200,200,200,0.3) 65%)',
}) => {
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
      { threshold: 0.7 },
    );

    observer.observe(divider);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={dividerRef}
      className={`divider-container ${isVisible ? 'visible' : 'hidden'}`}
      style={{
        '--divider-gradient-lg': gradientLg,
        '--divider-gradient-md': gradientMd,
        '--divider-gradient-sm': gradientSm,
      }}
    >
      <div className="divider-content">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default Divider;
