import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/pages/NavBar.scss';

const NavBar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  let loginOrLogoutText = 'Login';
  if (isLogin) loginOrLogoutText = 'Logout';
  return (
    <div className='navbar-root'>
      <div className='navbar-left'>
        {/* <span>Main</span> */}
        <Link className='navbar-btn' to={isLogin ? '/oauth/kakao/callback' : '/login'}>Main</Link>
      </div>
      <div className='navbar-right'>
        {/* <span>{loginOrLogoutText}</span> */}
        <Link className='navbar-btn' to={'/'}>{loginOrLogoutText}</Link>
      </div>
    </div>
  );
}

export default NavBar;