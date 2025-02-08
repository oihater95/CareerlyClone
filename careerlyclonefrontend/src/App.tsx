import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingLoginPage from "./pages/LandingLoginPage";
import MainPage from "./pages/MainPage";
import NavBar from "./components/common/Navbar";
import PostingDetailComponent from "./components/posting/PostingDetailComponent";
import "./App.scss";
import CreateFormComponent from "./components/posting/CreateFormComponent";

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <div className="root-container">
        <Routes>
          <Route path="/" element={<LandingLoginPage />} />
          <Route path="/oauth/kakao/callback" element={<MainPage />} />
          <Route path="/posting/:id" element={<PostingDetailComponent />} />
          <Route path="createPost" element={<CreateFormComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
