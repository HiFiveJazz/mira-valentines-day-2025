// FlexText.jsx
import { useEffect, useRef, useState } from 'react';
import './CSS/FlexText.css';

const source = 'जस्मीभ';
const target = 'ジャズ';

const FlexText = (props) => {
  const [displayedText, setDisplayedText] = useState(source);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const morphTo = (from, to) => {
    const current = from.split('');
    const targetChars = to.split('');
    const minLength = Math.min(from.length, to.length);

    clearInterval(intervalRef.current);

    let index = 0;

    intervalRef.current = setInterval(() => {
      if (index >= minLength) {
        clearInterval(intervalRef.current);
        setDisplayedText(to);
        return;
      }

      current[index] = targetChars[index] ?? '';
      setDisplayedText(current.slice(0, from.length).join(''));
      index += 1;
    }, 25);
  };

  return (
    <div style={props.style}>
      <div className="flextext-container">
        <h1 className="gradient-text-name">Jazz Bhatia</h1>

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '10px',
          }}
          onMouseEnter={() => morphTo(source, target)}
          onMouseLeave={() => morphTo(target, source)}
        >
          <h2 className="morphing-text">{displayedText}</h2>
          <h3>/jasmīt bhātiyā/</h3>
        </div>
      </div>
    </div>
  );
};

export default FlexText;
