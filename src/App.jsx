import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Heading from './components/Heading';
import CardSlider from './components/CardSlider';
import DateSelector from './components/DateSelector';
import riversideImages from './data/riverside';
import iceskatingImages from './data/ice_skating';

function App() {
  return (
    <Router>
      <Heading />
      <Routes>
        <Route path="/" 
          element={
            <div>
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
              <CardSlider images={iceskatingImages} title="Ice Skating" />
              <CardSlider images={riversideImages} title="Riverside Lights" />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

