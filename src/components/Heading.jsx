import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Heading = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Dates', link: '/dates' },
    { name: 'Statistics', link: '/statistics' },
    { name: 'Relationship Recap', link: '/relationship-recap' },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Safari Fix: Ensure we don't trigger at scroll boundaries
      if (currentScrollY <= 0) {
        setIsHeaderVisible(true); // Always show header at the top
        return;
      }

      if (currentScrollY + window.innerHeight >= document.body.scrollHeight) {
        setIsHeaderVisible(true); // Always show header at the bottom
        return;
      }

      // Show or hide header based on scroll direction
      if (currentScrollY > lastScrollY) {
        setIsHeaderVisible(false); // Scrolling down
      } else {
        setIsHeaderVisible(true); // Scrolling up
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isHeaderVisible ? 'visible' : 'hidden'}`}>
      <img src="/heart-logo.png" alt="Heart Logo" className="header-logo" />
      <button className="hamburger-menu" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.link}
            className="header-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Heading;

