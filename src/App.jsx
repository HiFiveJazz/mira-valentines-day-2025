import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage'
import Dates from './pages/Dates'
import Stats from './pages/Stats'
import Invitation from './pages/Invitation'
import RelationshipRecap from './pages/RelationshipRecap'
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
        <Route
          path="/dates"
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
      </Routes>
    </Router>
  );
}

export default App;
