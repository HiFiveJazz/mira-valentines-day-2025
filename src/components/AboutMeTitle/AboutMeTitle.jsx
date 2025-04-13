// AboutMeTitle.jsx
import FourPanels from '../FourPanels/FourPanels';
import FlexText from '../FlexText/FlexText';
import './CSS/AboutMeTitle.css';

const AboutMeTitle = () => {
  return (
    <div className="about-me-container">
      <div className="flex-text-wrapper">
        <FlexText />
      </div>
      <div className="panels-wrapper">
        <FourPanels />
      </div>
    </div>
  );
};

export default AboutMeTitle;

