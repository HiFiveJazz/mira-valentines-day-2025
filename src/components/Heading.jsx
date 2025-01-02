import React, { useState } from 'react';
import '../App.css'; // Import the CSS file

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Dates', link: '/dates' },
    { name: 'Statistics', link: '/projects' },
    { name: 'Invitation', link: '/contact' },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <img src="/heart-logo.png" alt="Heart Logo" className="header-logo" />
      <button className="hamburger-menu" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a key={item.name} href={item.link} className="header-nav-link">
            {item.name}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;

