import DateSelector from '../components/DateSelector/DateSelector';
import Weather from '../components/Weather/weather';
import Divider from '../components/Divider/Divider'
import CardSlider from '../components/CardSlider';
import photoshootmichelleImages from '../data/photoshoot-michelle';
import iceskatingImages from '../data/ice-skating';
import Footer from '../components/Footer/Footer';

const Dates = () => {

  return (
    <div> 
      <DateSelector/>
      <Weather 
        city="San Diego"
        heading="6-Day Weather Forecast for San Diego" 
      />
      <Weather 
        city="Maple Grove"
        heading="6-Day Weather Forecast for Maple Grove" 
      />
      <Divider title='2025'/>
      <CardSlider images={photoshootmichelleImages} title="Photoshoot with Michelle" />
      <CardSlider images={iceskatingImages} title="Cat Cafe" />
      {/* <Footer/> */}
    </div>
  );
};

export default Dates;
