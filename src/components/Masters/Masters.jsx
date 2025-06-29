import React, { useState, useEffect } from 'react';
import SizeableBox from '../SizeableBox/SizeableBox';
import './CSS/Masters.css';
import MastersText from '../MastersText/MastersText';
const dartmouth = '/moments-compressed/darmouth.webp';

const Masters = () => {
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
          <p className="education-intro">MASTERS</p>
        </div>

        {/* 2) Image box */}
        <div className="image-box">
          <div className="gradient-mask-box">
            <div className="image-gradient-wrapper">
              <SizeableBox
                type="image"
                imageUrl={dartmouth}
                height={isMobile ? '500px' : '300px'}
                width={isMobile ? '68vw' : '400px'}
              />
            </div>
            <p>Dartmouth in Spring</p>
          </div>
        </div>

        {/* 3) Text box: your <EducationText /> */}
        <div className="text-box">
          <MastersText/>
        </div>

      </div>
    </div>
  );
};

export default Masters;
