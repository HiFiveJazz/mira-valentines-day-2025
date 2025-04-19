import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import DarkModeToggle from './DarkModeToggle/DarkModeToggle';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isInline, setIsInline] = useState(() => window.innerWidth > 768);

  // refs for scroll‑throttling
  const lastScrollY = useRef(window.scrollY);
  const ticking    = useRef(false);

  const toggleMenu = () => setMenuOpen(open => !open);

  // navigation items with explicit links
  const navItems = [
    { name: 'Home',        link: '/' },
    { name: 'Moments',     link: '/moments' },
    { name: 'Photography', link: '/photography' },
    { name: 'Hangouts',    link: '/hangouts' },
    { name: 'About Me',    link: '/about-me' },
    // { name: 'About Me',    link: '/about-me' },
  ];

  // 1) Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  // 2) Throttled scroll listener to hide/show header
  const handleScroll = useCallback(() => {
    const y       = window.scrollY;
    const height  = document.documentElement.scrollHeight;
    const viewHt  = window.innerHeight;
    let   visible = isHeaderVisible;

    if (y + viewHt >= height - 5) {
      visible = true;
    } else if (y < lastScrollY.current || y <= 0) {
      visible = true;
    } else {
      visible = false;
    }

    if (visible !== isHeaderVisible) {
      setIsHeaderVisible(visible);
    }

    lastScrollY.current = y;
    ticking.current     = false;
  }, [isHeaderVisible]);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(handleScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  // 3) Simple resize listener to toggle inline vs. mobile
  useEffect(() => {
    const onResize = () => setIsInline(window.innerWidth > 768);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
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
        <Link to="/" onClick={handleLinkClick}>
          <img src="/heart-logo.webp" alt="Heart Logo" className="header-logo" />
        </Link>

        {isInline ? (
          <div className="header-inline-nav">
            {navItems.map(item => (
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

      {!isInline && (
        <nav className={`header-nav ${menuOpen ? 'show' : ''}`}>  
          {navItems.map(item => (
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

