import { useEffect, useRef, useState } from 'react';
import './CSS/Footer.css';

const Footer = () => {
  const dividerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();

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
      className={`footer-container ${isVisible ? 'visible' : 'hidden'}`}
    >
      <div className="footer-content">
        <p>© {currentYear} Jasmeet Bhatia</p>
      </div>
    </div>
  );
};

export default Footer;
