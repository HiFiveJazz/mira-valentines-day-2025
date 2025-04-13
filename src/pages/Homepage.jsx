import Writing from '../components/Writing/Writing'
import Rotating3D from '../components/Rotating3D/Rotating3D'
import Button from '../components/Button/Button'
import Bunnies from '../images/homepage/bunnies.webm';
import FallingItem from '../components/FallingItem/FallingItem';
import Footer from '../components/Footer/Footer';

const Homepage = () => {

  return (
    <div> 
      <Writing/>
      <Rotating3D
        videoUrl={Bunnies}
        title="About Me"
        description="Hi! I'm Jazz, a Minnesotan living in California sharing my favorite moments, photos, and other cool stuff I love. Enjoy your stay!" 
      />
      <Button
        text="Get Started"
        target ="/moments"
      />
      <FallingItem/>
      <Footer/>
    </div>
  );
};

export default Homepage;

