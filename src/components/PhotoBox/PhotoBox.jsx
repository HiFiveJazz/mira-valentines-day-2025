import React, { useState, useEffect } from 'react';
import SizeableBox from '../SizeableBox/SizeableBox';
import imageList from './imageImports'; // Import generated list

const PhotoBox = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {imageList.map((imageUrl, index) => (
        <SizeableBox
          key={index}
          type="image"
          imageUrl={imageUrl} // Corrected path
          height={isMobile ? '300px' : '400px'}
          width={isMobile ? '75%' : '400px'}
          onClick={() => console.log(`Image ${index + 1} clicked!`)}
        />
      ))}
    </div>
  );
};

export default PhotoBox;

