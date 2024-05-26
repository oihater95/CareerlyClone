import React, { useState } from 'react';
import { KAKAO_AUTH_URL } from '../config/config';
import '../css/pages/MainPage.scss'

// 랜딩 페이지 컴포넌트
const LandingLoginPage: React.FC = () => {
  // 백엔드에서 받아야할듯..?

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="root-content-grid-container">
      <button type='button' onClick={handleLogin}>
        Kakao Login
      </button>
    </div>
  );
};


// TODO Kakao SignUp

export default LandingLoginPage;