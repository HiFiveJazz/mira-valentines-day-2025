import React, { useState, useEffect } from 'react';
import Divider from '../components/Divider/Divider';
import PhotoBox from '../components/PhotoBox/PhotoBox';
import Footer from '../components/Footer/Footer';

const Photos = () => {

  return (
    <div> 
      <Divider title='Photos'/>
      <PhotoBox/>
      <Footer/>
    </div>
  );
};

export default Photos;
