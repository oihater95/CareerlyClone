import React, { useState } from 'react';
import '../css/pages/LandingLoginPage.scss'

// 랜딩 페이지 컴포넌트
const LandingLoginPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleClickLogin = () => {
    setShowLogin(false);
  };

  return (
    <div>
      {showLogin && <LoginForm onClose={handleClickLogin} />}
      {/* {showLogin ? <LoginForm onClose={handleClickLogin} /> : 로그인 상태 Landing } */}
    </div>
  );
};

// 로그인 컴포넌트
const LoginForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 여기에 로그인 처리 로직을 추가하세요.
    console.log('Username:', username);
    console.log('Password:', password);
    onClose();
  };

  return (
    <div className='landing-login'>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='landing-login--btn' onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LandingLoginPage;