import React from 'react';
import ThreePanels from "../ThreePanels/ThreePanels";
import AboutMeText from "../AboutMeText/AboutMeTitle";
import './CSS/AboutMeInfo.css';

const AboutMeInfo = () => {
  return (
    <div className="aboutMeInfo-wrapper">
      <div className="aboutMeContainer">
        {/* Column 1 */}
        <div className="columnOne">
          <ThreePanels />
        </div>

        {/* Column 2 */}
        <div className="columnTwo">
          <AboutMeText />
        </div>
      </div>
    </div>
  );
};

export default AboutMeInfo;

