import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Heading = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Moments', link: '/moments' },
    { name: 'Photography', link: '/photography' },
    { name: 'Dates', link: '/dates' },
    { name: 'Stats', link: '/stats' },
    { name: 'R&R', link: '/relationship-recap' },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setIsHeaderVisible(true);
        return;
      }

      if (currentScrollY + window.innerHeight >= document.body.scrollHeight) {
        setIsHeaderVisible(true);
        return;
      }

      if (currentScrollY > lastScrollY) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className={`header ${isHeaderVisible ? 'visible' : 'hidden'}`}>
      <Link to="/" onClick={handleLinkClick}>
        <img src="/heart-logo.png" alt="Heart Logo" className="header-logo" />
      </Link>
      <button className="hamburger-menu" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.link}
            className="header-nav-link"
            onClick={handleLinkClick}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Heading;

