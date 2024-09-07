import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/pages/NavBar.scss';

const NavBar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  let loginOrLogoutText = 'Login';
  if (isLogin) loginOrLogoutText = 'Logout';
  // 카카오 서버로 부터 받은 accessToken 임시처리
  const params = new URL(document.URL).searchParams;
  // 인가코드는 백엔드로 넘겨서 reponse로 jwt 토큰 받기
  const code = params.get('code');
  return (
    <div className='navbar-root'>
      <div className='navbar-left'>
        {/* <span>Main</span> */}
        <Link className='navbar-btn' to={isLogin ? `/oauth/kakao/callback?code=${code}` : '/login'}>Main</Link>
      </div>
      <div className='navbar-right'>
        {/* <span>{loginOrLogoutText}</span> */}
        <Link className='navbar-btn' to={'/'}>{loginOrLogoutText}</Link>
      </div>
    </div>
  );
}

export default NavBar;