import React, { useState, useEffect } from 'react';
import SizeableBox from '../SizeableBox/SizeableBox';
import './CSS/Education.css';
import EducationText from '../EducationText/EducationText';
const img11 = '/moments-compressed/DSC_8029.webp';

const Education = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 800);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="education-overlay-wrapper">
      <div className="education">
        {/* 1) Intro box: just the heading */}
        <div className="intro-box">
          <p className="education-intro">EDUCATION</p>
        </div>

        {/* 2) Image box */}
        <div className="image-box">
          <div className="gradient-mask-box">
            <div className="image-gradient-wrapper">
              <SizeableBox
                type="image"
                imageUrl={img11}
                height={isMobile ? '500px' : '300px'}
                width={isMobile ? '68vw' : '400px'}
              />
            </div>
            <p>UC San Diego in January</p>
          </div>
        </div>

        {/* 3) Text box: your <EducationText /> */}
        <div className="text-box">
          <EducationText />
        </div>
      </div>
    </div>
  );
};

export default Education;

