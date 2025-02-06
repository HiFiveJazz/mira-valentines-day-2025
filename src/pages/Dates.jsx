import DateSelector from '../components/DateSelector/DateSelector';
import Weather from '../components/Weather/weather';
import Divider from '../components/Divider/Divider'
import CardSlider from '../components/CardSlider';
import riversideImages from '../data/riverside';
import iceskatingImages from '../data/ice-skating';
import roundImages from '../data/round-one';
import bdayImages from '../data/jazz-bday-2024';

const Dates = () => {

  return (
    <div> 
      <DateSelector/>
      <Weather 
        city="Riverside"
        heading="6-Day Weather Forecast for Riverside" 
      />
      <Weather 
        city="San Diego"
        heading="6-Day Weather Forecast for San Diego" 
      />
      {/* <Weather  */}
      {/*   city="Ho Chi Minh City" */}
      {/*   heading="6-Day Weather Forecast for Ho Chi Minh City"  */}
      {/* /> */}
      {/* <Weather  */}
      {/*   city="Maple Grove" */}
      {/*   heading="6-Day Weather Forecast for Maple Grove"  */}
      {/* /> */}
      <Divider title='2025'/>
      <CardSlider images={bdayImages} title="Jasmeet's Birthday" />
      <CardSlider images={roundImages} title="Round One" />
      <Divider title='2024'/>
      <CardSlider images={riversideImages} title="Riverside Lights" />
      <CardSlider images={iceskatingImages} title="Ice Skating" />
    </div>
  );
};

export default Dates;
