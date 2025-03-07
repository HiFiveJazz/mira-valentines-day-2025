import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage'
import Moments from './pages/Moments';
import Photos from './pages/Photos'
import Dates from './pages/Dates'
import Stats from './pages/Stats'
import RelationshipRecap from './pages/RelationshipRecap'
import Invitation from './pages/Invitation'
import Valentines from './pages/Valentines';
import Heading from './components/Heading';
function App() {
  return (
    <Router>
      <Heading />
      <Routes>
        <Route path="/" 
          element={
              <Homepage/>
          } />
        <Route path="/moments" 
          element={
            <Moments/>
          } />
        <Route path="/photography" 
          element={
            <Photos/>
          } />
        <Route
          path="/hangouts"
          element={
              <Dates/>
          }
        />
        <Route
          path="/stats"
          element={
              <Stats/>
          }
        />
        <Route
          path="/relationship-recap"
          element={
              <RelationshipRecap/>
          }
        />
        <Route
          path="/invitation"
          element={
              <Invitation/>
          }
        />
        <Route
          path="/valentines-day"
          element={
              <Valentines/>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
