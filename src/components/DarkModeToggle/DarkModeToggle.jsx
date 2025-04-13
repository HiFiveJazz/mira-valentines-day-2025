// DarkModeToggle.jsx
import React, { useState, useEffect } from 'react';
import './CSS/DarkModeToggle.css';

const DarkModeToggle = () => {
  // Initialize darkMode based on previous preference in localStorage OR system preference
  const getInitialTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      return stored === 'dark';
    } else {
      // Fallback: check system preference
      return window.matchMedia &&
             window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  // Whenever darkMode changes, update <html> class & localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleMode = () => setDarkMode(prev => !prev);

  return (
    <button 
      onClick={toggleMode} 
      aria-label="Toggle dark mode" 
      style={{ cursor: 'pointer' }}
      className='darkmode-button'
    >
      {/* Icon is rendered solely via CSS */}
    </button>
  );
};

export default DarkModeToggle;

