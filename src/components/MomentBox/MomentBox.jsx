import React, { useState, useEffect } from 'react';
import SizeableBox from '../SizeableBox/SizeableBox';
import imageList from './imageImports'; // Now using compressed images

const MomentBox = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showPopover, setShowPopover] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleImageClick = (index) => {
    if (index === 36) { // Image 37 (0-based index)
      setShowPopover(true);
    }
  };

  const handleNo = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setShowPopover(false);
      setIsFadingOut(false);
    }, 300);
  };

  const handleCancel = () => {
    setShowPopover(false);
    setIsFadingOut(false);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', position: 'relative' }}>
      {imageList.map((imageUrl, index) => (
        <SizeableBox
          key={index}
          type="image"
          imageUrl={imageUrl}
          height={isMobile ? '300px' : '400px'}
          width={isMobile ? '75%' : '400px'}
          onClick={() => handleImageClick(index)}
        />
      ))}

      {showPopover && (
        <div className={`popup ${isFadingOut ? 'hide' : 'show'}`}>
          <p>Ahh the memories, crazy it's been 2 months! (2/3)</p>
          <p>1 → R</p>
          <p>7 → M</p>
          <p>9 → r</p>
          <button onClick={handleCancel}>Go</button>
        </div>
      )}
    </div>
  );
};

export default MomentBox;

