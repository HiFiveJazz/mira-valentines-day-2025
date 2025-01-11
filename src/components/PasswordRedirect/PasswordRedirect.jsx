import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordRedirect.css';

const PasswordRedirect = ({ text, correctPassword, target }) => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      navigate(target, { state: { password } }); // Pass the password as state
      window.scrollTo(0, 0); // Scroll to the top of the page
    } else {
      setErrorMessage('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="password-redirect-container">
      <form onSubmit={handleSubmit} className="password-form">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="One Last Thing :)"
          className="password-input"
        />
        <button type="submit" className="get-started-button">
          Submit
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default PasswordRedirect;

