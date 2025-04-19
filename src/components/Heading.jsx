import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import DarkModeToggle from './DarkModeToggle/DarkModeToggle';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  // Desktop vs mobile: inline nav if window width > 768
  const [isInline, setIsInline] = useState(() => window.innerWidth > 768);

  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Moments', link: '/moments' },
    { name: 'Photography', link: '/photography' },
    { name: 'Hangouts', link: '/hangouts' },
    { name: 'About', link: '/about-me' },
  ];

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Prevent page scrolling if the menu is open (mobile overlay)
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Hide/show header on scroll + show if near page bottom
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      // 1) If near bottom => show header
      if (currentScrollY + viewportHeight >= docHeight - 5) {
        setIsHeaderVisible(true);
      }
      // 2) If user scrolls up or is at top => show header
      else if (currentScrollY < lastScrollY || currentScrollY <= 0) {
        setIsHeaderVisible(true);
      }
      // 3) Otherwise, user is scrolling down => hide header
      else {
        setIsHeaderVisible(false);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Recompute isInline on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsInline(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header
      className={`header-container ${
        menuOpen ? 'open visible' : isHeaderVisible ? 'visible' : 'hidden'
      }`}
    >
      <div className={`header-top ${isInline ? 'full-nav' : ''}`}>
        {/* Logo */}
        <Link to="/" onClick={handleLinkClick}>
          <img src="/heart-logo.webp" alt="Heart Logo" className="header-logo" />
        </Link>

        {/** 
         * Desktop (isInline): Render the nav items inline with dark mode toggle.
         * Mobile (isInline=false): Render a container with the DarkModeToggle and hamburger button.
         */}
        {isInline ? (
          <div className="header-inline-nav">
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
            <DarkModeToggle />
          </div>
        ) : (
          <div className="mobile-header-icons">
            {/* Dark mode toggle on mobile */}
            <DarkModeToggle />
            <button
              type="button"
              className={`hamburger-menu ${menuOpen ? 'open' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <span className="bar top" />
              <span className="bar middle" />
              <span className="bar bottom" />
            </button>
          </div>
        )}
      </div>

      {/**
       * On desktop => no overlay nav (we already have inline in .header-top)
       * On mobile => full-screen nav overlay if menuOpen
       */}
      {!isInline && (
        <nav className={`header-nav ${menuOpen ? 'show' : ''}`}>
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
      )}
    </header>
  );
};

export default Header;

