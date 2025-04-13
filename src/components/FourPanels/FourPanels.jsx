import React from 'react';
import SizeableBox from '../SizeableBox/SizeableBox';
import img4 from '../../images-compressed/about-me/4.webp';
import img6 from '../../images-compressed/about-me/6.webp';
import img7 from '../../images-compressed/about-me/7.webp';
import img10 from '../../images-compressed/about-me/10.webp';
import './CSS/FourPanels.css';

const FourPanels = () => {
  return (
    <div className="fourpanels-overlay-wrapper gradient-mask-four">
      <div className="fourpanels">
        {/* Panel 1: Top-left */}
        <div className="panel panel1">
          <SizeableBox 
            type="image" 
            imageUrl={img4}
            height="323px" 
            width="200px"
          />
        </div>

        {/* Panel 2: Top-middle */}
        <div className="panel panel2">
          <SizeableBox 
            type="image" 
            imageUrl={img7}
            height="405.5px" 
            width="250px"
          />
        </div>

        {/* Panel 3: Right column with stacked images */}
        <div className="panel panel3">
          <SizeableBox 
            type="image" 
            imageUrl={img10}
            height="375px" 
            width="375px"
          />
          <SizeableBox 
            type="image" 
            imageUrl={img6}
            height="300px" 
            width="300px"
          />
        </div>
      </div>
    </div>
  );
};

export default FourPanels;

