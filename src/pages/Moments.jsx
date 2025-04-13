import Divider from '../components/Divider/Divider'
import MomentBox from '../components/MomentBox/MomentBox'
import Footer from '../components/Footer/Footer';

const Moments = () => {

  return (
    <div> 
      <Divider 
        title='Moments'
        gradientLg = 'linear-gradient(294deg, hsl(251, 58%,49%) 20%, hsl(133,77%,33%) 65%)'
        gradientMd = 'linear-gradient(294deg, rgb(255,255,0) 20%, rgba(200,200,200,0.3) 65%)'
        gradientSm = 'linear-gradient(294deg, rgb(0,128,255) 20%, rgba(200,200,200,0.3) 65%)'
      />
      <MomentBox/>
      <Footer/>
    </div>
  );
};

export default Moments;
