import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Heading from './components/Heading';
import CardSlider from './components/CardSlider';
import DateSelector from './components/DateSelector';
import BentoBoxGrid from './components/BentoBox/BentoBoxGrid'
import Writing from './components/Writing/Writing'
import CircleImageHeading from './components/CircleImageHeading/CircleImageHeading'
import Button from './components/Button/Button'
import riversideImages from './data/riverside';
import iceskatingImages from './data/ice-skating';
import CircleImage from './images/riverside-lights/IMG_2039.jpg';

function App() {
  return (
    <Router>
      <Heading />
      <Routes>
        <Route path="/" 
          element={
            <div>
              <Writing/>
              <CircleImageHeading 
                imageUrl={CircleImage}
                title="About Us"
                description="Hi! We're Mira and Jazz, a California-based couple sharing our little corner of the internet. Welcome to our blog! Here, we post about our fun adventures, share cute and quirky stats about us, amazing food we've eaten, and sprinkle in some other cool, nifty stuff we love! We hope you enjoy your stay!" 
              />
              <Button/>
            </div>
          } />
        <Route
          path="/dates"
          element={
            <div>
              <DateSelector/>
              <CardSlider images={iceskatingImages} title="Ice Skating" />
              <CardSlider images={riversideImages} title="Riverside Lights" />
            </div>
          }
        />
        <Route
          path="/statistics"
          element={
            <div>
              <BentoBoxGrid/>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

