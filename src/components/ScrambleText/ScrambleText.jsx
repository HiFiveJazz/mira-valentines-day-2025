import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/ScrambleText.css';

const ScrambleText = ({ text, correctPassword, target }) => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [displayText, setDisplayText] = useState(text);
  const [isDeciphered, setIsDeciphered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isDeciphered) {
      let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let interval = setInterval(() => {
        setDisplayText((prevText) =>
          prevText
            .split('')
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join('')
        );
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isDeciphered]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsDeciphered(true);
      gradualDecipher();
    } else {
      setErrorMessage('Nice Try 🥱 Try putting the clues together!');
    }
  };

  const gradualDecipher = () => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let scrambled = displayText.split('');
    let finalText = text.split('');
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < finalText.length) {
        scrambled = scrambled.map((char, index) =>
          index <= currentIndex ? finalText[index] : chars[Math.floor(Math.random() * chars.length)]
        );
        setDisplayText(scrambled.join(''));
        currentIndex++;
      } else {
        clearInterval(interval);
        setErrorMessage('Where does this go? 🤔');
        // setTimeout(() => navigate(target, { state: { password } }), 1000);
        // window.scrollTo(0, 0);
      }
    }, 50);
  };

  return (
    <div className="scramble-redirect-container">
      <p className="scrambled-text">{displayText}</p>
      <form onSubmit={handleSubmit} className="scramble-form">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Good Luck >:)"
          className="scramble-input"
        />
        <button type="submit" className="get-started-button">
          Submit
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default ScrambleText;

