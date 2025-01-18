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
import Divider from './components/Divider/Divider'
import Subdivider from './components/Subdivider/Subdivider';
import PasswordRedirect from './components/PasswordRedirect/PasswordRedirect';
import Poem from './components/Poem/poem'
import LoveLetter from './components/LoveLetter/LoveLetter';
import Weather from './components/Weather/weather';
import BingoCard from './components/BingoCard/BingoCard';
import Spotify from './components/Spotify/Spotify';

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
              <Button
                text="Get Started"
                target ="/relationship-recap"
              />
            </div>
          } />
        <Route
          path="/dates"
          element={
            <div>
              <DateSelector/>
              {/* <Weather  */}
              {/*   lat="33.9533"  */}
              {/*   lon="-117.3962"  */}
              {/*   heading="5-Day Weather Forecast for Riverside"  */}
              {/* /> */}
              {/* <Weather  */}
              {/*   lat="32.7157"  */}
              {/*   lon="-117.1611"  */}
              {/*   heading="5-Day Weather Forecast for San Diego"  */}
              {/* /> */}
              <Weather 
                // lat="10.8231" 
                // lon="106.6297" 
                city="Ho Chi Minh City"
                heading="5-Day Weather Forecast for Ho Chi Minh City" 
              />
              <Weather 
                // lat="45.0725" 
                // lon="-93.4558" 
                city="Maple Grove"
                heading="5-Day Weather Forecast for Maple Grove" 
              />
              <Divider title='2024'/>
              <CardSlider images={riversideImages} title="Riverside Lights" />
              <CardSlider images={iceskatingImages} title="Ice Skating" />
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
        <Route
          path="/relationship-recap"
          element={
            <div>
              <Divider title='2024 Relationship Recap!'/>
              <Subdivider title="This year, we wrote our story in texts, laughs, and unforgettable moments. Let's take a look back at all the ways we made magic together."/>
              <Divider title='Statistics'/>
              <Subdivider title="Words, emojis, and inside jokes: we broke some serious records this year! Here's the data back up our legendary bond."/>
              <BentoBoxGrid/>
              <Divider title='Spotify Blend'/>
              <Subdivider title="Your top tracks, my top tracks, and everything in between. Our Spotify Blend is the playlist that defines our year—full of hits, memories, and everything we vibed to together."/>
              <Spotify playlistId="28LjezHHXUbKIFKP97MIGt" />
              <Divider title='Bucket List for 2025'/>
              <Subdivider title="Big dreams, bold plans, and unforgettable vibes—our 2025 bucket list is set to make history. Here’s what’s queued up for our year ahead!"/>
              <BingoCard/>
              <Divider title='Dates'/>
              <Subdivider title="From late-night adventures to cozy resturaunts, here's how we turned ordinary days into extraordinary memories"/>
              <CardSlider images={riversideImages} title="Riverside Lights" />
              <CardSlider images={iceskatingImages} title="Ice Skating" />
              <PasswordRedirect correctPassword="sushi" target="/invitation" />
            </div>
          }
        />
        <Route
          path="/invitation"
          element={
            <div>
              <Divider title='For Mira'/>
              <Poem />
              <LoveLetter/>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
