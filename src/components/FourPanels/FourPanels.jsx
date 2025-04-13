import React, { useState, useEffect } from 'react';
import SizeableBox from '../SizeableBox/SizeableBox';
import img4 from '../../images-compressed/about-me/4.webp';
import img6 from '../../images-compressed/about-me/6.webp';
import img7 from '../../images-compressed/about-me/7.webp';
import img10 from '../../images-compressed/about-me/10.webp';
import './CSS/FourPanels.css';

const FourPanels = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fourpanels-overlay-wrapper gradient-mask-four">
      <div className="fourpanels">
        {/* Box 1: Top-left */}
        <div style={{ gridColumn: '1 / 2', gridRow: '1 / 2', marginTop: '225px' }}>
          <SizeableBox 
            type='image' 
            imageUrl={img4}
            height='323px' 
            width='200px'
          />
        </div>

        {/* Box 2: Top-middle */}
        <div style={{ gridColumn: '2 / 3', gridRow: '1 / 2', marginTop: '100px' }}>
          <SizeableBox 
            type='image' 
            imageUrl={img7}
            height='405.5px' 
            width='250px'
          />
        </div>

        {/* Column 3: stacked Box 3 & 4 */}
        <div style={{ gridColumn: '3 / 4', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <SizeableBox 
            type='image' 
            imageUrl={img10}
            height='375px' 
            width='375px'
          />
          <SizeableBox 
            type='image' 
            imageUrl={img6}
            height='300px' 
            width='300px'
          />
        </div>
      </div>
    </div>
  );
};

export default FourPanels;
