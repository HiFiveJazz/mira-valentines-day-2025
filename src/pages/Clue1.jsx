import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import Subdivider from '../components/Subdivider/Subdivider';

const Valentines = () => {
  const [size, setSize] = useState("80vw"); // Default to 80% of viewport width

  useEffect(() => {
    const updateSize = () => {
      const newSize = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.8);
      setSize(`${newSize}px`);
    };

    updateSize(); // Set initial size
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh' 
    }}>
      {/* Override the specific paragraph inside Subdivider */}
      <style>{`
        .subdivider-content p {
          margin-bottom: 0 !important;
        }
      `}</style>

      <Subdivider title="You found the first Valentine's clue! Hope you put it togther! (1/3)" />
      <Subdivider title="2 → o" />
      <Subdivider title="5 → s" />
      <Subdivider title="8 → i" />
      <Subdivider title="10 → a" />
      <Footer />
    </div>
  );
};

export default Valentines;
