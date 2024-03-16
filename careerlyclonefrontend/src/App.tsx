// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingLoginPage from './pages/LandingLoginPage';
import './App.scss'

const App: React.FC = () => {
  return (
    <Router>
      <div className='root-container'>
        <Routes>
          <Route path="/" Component={LandingLoginPage} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;