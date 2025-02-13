import React, { useState, useEffect } from 'react';
import Divider from '../components/Divider/Divider';
import PhotoBox from '../components/PhotoBox/PhotoBox';
import Footer from '../components/Footer/Footer';

const Photos = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopover(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setShowPopover(false);
      setIsFadingOut(false);
    }, 300);
  };

  return (
    <div> 
      <Divider title='Photos'/>
      <PhotoBox/>
      <Footer/>
      {showPopover && (
        <div className={`popup ${isFadingOut ? 'hide' : 'show'}`}>
          <p>An enjoyer of photography I see! (3/3)</p>
          <p>3 → s</p>
          <p>4 → e</p>
          <p>6 → 4</p>
          <button onClick={handleClose}>Go</button>
        </div>
      )}
    </div>
  );
};

export default Photos;
