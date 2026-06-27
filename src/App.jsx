import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from '../src/pages/LandingPage';
import LoginLayout from '../src/pages/LoginLayout';
// import ModelSite from './pages/ModelSite';
import WorkspacePage from './pages/WorkspacePage';
import SignUpLayout from './pages/SignUpLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Root path displays the Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* /login path displays the Login Layout */}
        <Route path="/login" element={<LoginLayout />} />

        {/* /clausesheildmodel path displays the Model site Layout */}
        <Route path="/workspace" element={<WorkspacePage />} />

        {/* /clausesheildmodel path displays the Model site Layout */}
        <Route path="/signup" element={<SignUpLayout />} />
      </Routes>
    </Router>
  );
}

export default App;