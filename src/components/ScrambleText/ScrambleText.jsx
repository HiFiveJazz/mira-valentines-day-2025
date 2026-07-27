import { useEffect, useState } from 'react';
import './CSS/ScrambleText.css';

const CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const ScrambleText = ({ text, correctPassword }) => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [displayText, setDisplayText] = useState(text);
  const [isDeciphered, setIsDeciphered] = useState(false);

  useEffect(() => {
    if (isDeciphered) {
      return;
    }

    const interval = setInterval(() => {
      setDisplayText((previousText) =>
        previousText
          .split('')
          .map(
            () =>
              CHARACTERS[
                Math.floor(Math.random() * CHARACTERS.length)
              ],
          )
          .join(''),
      );
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [isDeciphered]);

  const gradualDecipher = () => {
    let scrambled = displayText.split('');
    const finalText = text.split('');
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex >= finalText.length) {
        clearInterval(interval);
        setErrorMessage('Where does this go? 🤔');
        return;
      }

      scrambled = scrambled.map((character, index) =>
        index <= currentIndex
          ? finalText[index]
          : CHARACTERS[
              Math.floor(Math.random() * CHARACTERS.length)
            ],
      );

      setDisplayText(scrambled.join(''));
      currentIndex += 1;
    }, 50);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === correctPassword) {
      setErrorMessage('');
      setIsDeciphered(true);
      gradualDecipher();
    } else {
      setErrorMessage(
        'Nice Try 🥱 Try putting the clues together!',
      );
    }
  };

  return (
    <div className="scramble-redirect-container">
      <p className="scrambled-text">{displayText}</p>

      <form
        onSubmit={handleSubmit}
        className="scramble-form"
      >
        <input
          type="text"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          placeholder="Good Luck >:)"
          className="scramble-input"
        />

        <button
          type="submit"
          className="get-started-button"
        >
          Submit
        </button>
      </form>

      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}
    </div>
  );
};

export default ScrambleText;
