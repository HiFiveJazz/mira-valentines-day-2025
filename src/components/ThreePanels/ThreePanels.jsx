import React, { useState, useEffect } from 'react';
import SizeableBox from '../SizeableBox/SizeableBox';
import img1 from '../../images-compressed/about-me/1.webp';
import img11 from '../../images-compressed/about-me/11.webp';
import './CSS/ThreePanels.css';

const ThreePanels = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="threepanels-overlay-wrapper gradient-mask-box">
      <div className="threepanels">
        {/* Box 1 */}
        <div className="panel-column">
          <SizeableBox 
            type='image' 
            imageUrl={img1}
            height={isMobile ? '30vw' : '200px'}
            width={isMobile ? '30vw' : '200px'}
          />
          <p className="panel-text">New Beginnings</p>
        </div>

        {/* Box 2 */}
        <div
          style={{
            gridColumn: isMobile ? '1 / 2' : '2 / 3',
            gridRow: '1 / 2',
            marginTop: isMobile ? '-30px' : '100px', // Only apply on desktop
            marginLeft: isMobile ? '30vw' : '',
          }}
        >
          <SizeableBox 
            type='image'
            imageUrl={img11}
            height={isMobile ? '40vh' : '400px'}
            width={isMobile ? '30vw' : '250px'}
          />
        </div>
      </div>
    </div>
  );
};

export default ThreePanels;

