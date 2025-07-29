// App.jsx
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import "./App.css";

// lazy‑load each page
const Homepage  = lazy(() => import('./pages/Homepage'));
const Moments   = lazy(() => import('./pages/Moments'));
const Photos    = lazy(() => import('./pages/Photos'));
const Hangouts  = lazy(() => import('./pages/Hangouts'));
const AboutMe   = lazy(() => import('./pages/AboutMe'));
const Katrina   = lazy(() => import('./pages/Katrina'));

function App() {
  return (
    <>
      <div className="gradient" />
      <div className="app">
        <Router>
          <Header />

          {/* wrap your Routes in Suspense with a fallback UI */}
          <Suspense fallback={<div className="loading">Loading…</div>}>
            <Routes>
              <Route path="/"           element={<Homepage />} />
              <Route path="/moments"    element={<Moments />} />
              <Route path="/photography" element={<Photos />} />
              <Route path="/hangouts"   element={<Hangouts />} />
              <Route path="/about-me"   element={<AboutMe />} />
              <Route path="/katrina"   element={<Katrina/>} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </>
  );
}

export default App;

