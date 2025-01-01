import React from 'react';
import '../App.css'; // Import the CSS file

const Header = () => {
  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Dates', link: '/dates' },
    { name: 'Statistics', link: '/projects' },
    { name: 'Invitation', link: '/contact' },
  ];

  return (
    <header className="header">
      <h1 className="header-title">For Mira, My Love</h1>
      <nav className="header-nav">
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

