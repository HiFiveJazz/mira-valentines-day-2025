import DateSelector from '../components/DateSelector/DateSelector';
import Weather from '../components/Weather/weather';
import Divider from '../components/Divider/Divider'
import CardSlider from '../components/CardSlider';
import riversideImages from '../data/riverside';
import iceskatingImages from '../data/ice-skating';
import roundImages from '../data/round-one';
import bdayImages from '../data/jazz-bday-2024';
import Footer from '../components/Footer/Footer';

const Dates = () => {

  return (
    <div> 
      <DateSelector/>
      {/* <Weather  */}
      {/*   city="Riverside" */}
      {/*   heading="6-Day Weather Forecast for Riverside"  */}
      {/* /> */}
      <Weather 
        city="San Diego"
        heading="6-Day Weather Forecast for San Diego" 
      />
      <Weather 
        city="Maple Grove"
        heading="6-Day Weather Forecast for Maple Grove" 
      />
      <Divider title='2025'/>
      <CardSlider images={iceskatingImages} title="Cat Cafe" />
      {/* <CardSlider images={bdayImages} title="Jasmeet's Birthday" /> */}
      {/* <CardSlider images={roundImages} title="Round One" /> */}
      {/* <Divider title='2024'/> */}
      {/* <CardSlider images={riversideImages} title="Riverside Lights" /> */}
      <Footer/>
    </div>
  );
};

export default Dates;
