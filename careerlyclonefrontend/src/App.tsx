import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingLoginPage from './pages/LandingLoginPage';
import MainPage from './pages/MainPage';
import NavBar from './components/common/Navbar';
import './App.scss'

const App: React.FC = () => {
  return (
    <Router>
      <div className="root-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingLoginPage />} />
          <Route path="/oauth/kakao/callback" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;