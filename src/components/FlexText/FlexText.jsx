// FlexText.jsx
import React, { useState, useEffect, useRef } from 'react';
import './CSS/FlexText.css';

const source = 'जस्मीभ';
const target = 'ジャズ';

const FlexText = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [displayedText, setDisplayedText] = useState(source);
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const morphTo = (from, to) => {
    const current = from.split('');
    const targetChars = to.split('');
    const minLength = Math.min(from.length, to.length);
    clearInterval(intervalRef.current);

    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i >= minLength) {
        clearInterval(intervalRef.current);
        setDisplayedText(to);
        return;
      }
      current[i] = targetChars[i] ?? '';
      setDisplayedText(current.slice(0, from.length).join(''));
      i++;
    }, 25);
  };

  return (
    <div style={props.style}>
      <div className="flextext-container">
        {/* Instead of forcing "\n", let the text naturally wrap or use <br> */}
        <h1 className="gradient-text-name">Jazz Bhatia</h1>
        
        {/* Remove width: 'fit-content', let it size normally */}
        <div
          style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}
          onMouseEnter={() => morphTo(source, target)}
          onMouseLeave={() => morphTo(target, source)}
        >
          <h2 className="morphing-text">
            {displayedText}
          </h2>
          <h3>/jasmīt bhātiyā/</h3>
        </div>
      </div>
    </div>
  );
};

export default FlexText;

