import Writing from '../components/Writing/Writing'
import CircleImageHeading from '../components/CircleImageHeading/CircleImageHeading'
import Rotating3D from '../components/Rotating3D/Rotating3D'
import Button from '../components/Button/Button'
import CircleImage from '../images/riverside-lights/IMG_10.jpg';
import Bunnies from '../images/homepage/bunnies.mp4';
import FallingItem from '../components/FallingItem/FallingItem';
import Footer from '../components/Footer/Footer';

const Homepage = () => {

  return (
    <div> 
      <Writing/>
      <CircleImageHeading 
        imageUrl={CircleImage}
        title="About Us"
        description="Hi! We're Mira and Jazz, a California couple sharing our adventures, favorite eats, fun stats, and other cool stuff we love. Welcome to our blog—enjoy your stay!" 
      />
      {/* <Rotating3D */}
      {/*   videoUrl={Bunnies} */}
      {/*   title="About Us" */}
      {/*   description="Hi! We're Mira and Jazz, a California couple sharing our adventures, favorite eats, fun stats, and other cool stuff we love. Welcome to our blog—enjoy your stay!"  */}
      {/* /> */}
      <Button
        text="Get Started"
        target ="/relationship-recap"
      />
      <FallingItem/>
      <Footer/>
    </div>
  );
};

export default Homepage;

