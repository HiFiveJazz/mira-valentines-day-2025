import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage'
import Moments from './pages/Moments';
import Photos from './pages/Photos'
import Hangouts from './pages/Hangouts'
import Stats from './pages/Stats'
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
              <Hangouts/>
          }
        />
        <Route
          path="/stats"
          element={
              <Stats/>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
