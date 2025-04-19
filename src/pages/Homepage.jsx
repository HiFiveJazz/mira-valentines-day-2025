import Writing from '../components/Writing/Writing'
import Rotating3D from '../components/Rotating3D/Rotating3D'
import Button from '../components/Button/Button'
import BunniesWEBM from '../images/homepage/bunnies.webm';
import BunniesMP4 from '../images/homepage/bunnies-compressed.mp4';
import FallingItem from '../components/FallingItem/FallingItem';
import Footer from '../components/Footer/Footer';

const Homepage = () => {

  return (
    <div> 
      <Writing/>
      <Rotating3D
        webmUrl={BunniesWEBM}
        mp4Url={BunniesMP4}        
        title="About Me"
        description="Hi! I'm Jazz, a Minnesotan living in California sharing my favorite moments, photos, and other cool stuff I love. Enjoy your stay!" 
      />
      <Button
        text="Get Started"
        target ="/moments"
      />
      <FallingItem/>
      {/* <Footer/> */}
    </div>
  );
};

export default Homepage;
