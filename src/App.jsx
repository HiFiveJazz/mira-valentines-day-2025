import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage'
import Moments from './pages/Moments';
import Photos from './pages/Photos'
import Hangouts from './pages/Hangouts'
import AboutMe from './pages/AboutMe'
import Header from './components/Header';
import "./App.css"

function App() {
  return (
    <>
      {/* Render the gradient background outside of the main content container */}
      <div className="gradient"></div>
      <div className="app">
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/moments" element={<Moments/>} />
            <Route path="/photography" element={<Photos/>} />
            <Route path="/hangouts" element={<Hangouts/>} />
            <Route path="/about-me" element={<AboutMe/>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

