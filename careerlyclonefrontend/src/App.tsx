// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingLoginPage from './pages/LandingLoginPage';
import OAuth from './pages/OAuth';
import './App.scss'

const App: React.FC = () => {
  return (
    <Router>
      <div className='root-container'>
        {/* nav bar */}
        <Routes>
          <Route path="/" Component={LandingLoginPage} />
          <Route path="/oauth/kakao/callback" Component={OAuth} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;