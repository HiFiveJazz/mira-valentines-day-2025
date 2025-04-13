import React, { useState, useEffect } from 'react';
import Divider from '../components/Divider/Divider';
import PhotoBox from '../components/PhotoBox/PhotoBox';
import Footer from '../components/Footer/Footer';

const Photos = () => {

  return (
    <div> 
      <Divider 
        title='Photos'
        gradientLg = 'linear-gradient(294deg, hsl(351, 94%,49%) 20%, hsl(256,96%,33%) 65%)'
        gradientMd = 'linear-gradient(294deg, rgb(255,255,0) 20%, rgba(200,200,200,0.3) 65%)'
        gradientSm = 'linear-gradient(294deg, rgb(0,128,255) 20%, rgba(200,200,200,0.3) 65%)'
      />
      <PhotoBox/>
      <Footer/>
    </div>
  );
};

export default Photos;
