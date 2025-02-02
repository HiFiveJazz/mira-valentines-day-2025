import Writing from '../components/Writing/Writing'
import CircleImageHeading from '../components/CircleImageHeading/CircleImageHeading'
import Button from '../components/Button/Button'
import CircleImage from '../images/riverside-lights/IMG_10.jpg';

const Homepage = () => {

  return (
    <div> 
      <Writing/>
      <CircleImageHeading 
        imageUrl={CircleImage}
        title="About Us"
        description="Hi! We're Mira and Jazz, a California-based couple sharing our little corner of the internet. Welcome to our blog! Here, we post about our fun adventures, share cute and quirky stats about us, amazing food we've eaten, and sprinkle in some other cool, nifty stuff we love! We hope you enjoy your stay!" 
      />
      <Button
        text="Get Started"
        target ="/relationship-recap"
      />
    </div>
  );
};

export default Homepage;

