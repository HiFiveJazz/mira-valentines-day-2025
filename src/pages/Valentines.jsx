import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import Subdivider from '../components/Subdivider/Subdivider';
import Bunny from '../images/homepage/bunnies.mp4';
import SizeableBox from '../components/SizeableBox/SizeableBox';

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

      <Subdivider title="You found a Valentine's Day secret! Hope you enjoy ;>" />
      
      <SizeableBox 
        type="video" 
        videoUrl={Bunny}
        autoplay={true} 
        loop={true} 
        controls={false} 
        height={size}
        width={size}
      />

      <Footer />
    </div>
  );
};

export default Valentines;

