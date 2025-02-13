import Divider from '../components/Divider/Divider'
import Poem from '../components/Poem/poem'
import LoveLetter from '../components/LoveLetter/LoveLetter';
import Footer from '../components/Footer/Footer';

const Invitation = () => {

  return (
    <div> 
      <Divider title='For Mira'/>
      <Poem />
      <LoveLetter/>
      <Footer/>
    </div>
  );
};

export default Invitation;
