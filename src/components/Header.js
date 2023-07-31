import React, { useEffect, useState } from 'react';
import logoWhite from '../images/logo-white.png';
import { LoginPage, MainPage, RegisterPage } from './../utils/constants';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Header({currentPage}) {
  const authContext = React.useContext(AuthContext); 
  const [email, setEmail] = useState(authContext.userEmail);

  useEffect(() => {
    setEmail(authContext.userEmail)
  }, [authContext.userEmail]);

  function getContent(){
    switch (currentPage) {
      case LoginPage:
        return <Link className='header__link' to='/sign-up'>Регистрация</Link>
      case RegisterPage:
        return <Link className='header__link' to='/sign-in'>Войти</Link>
      case MainPage:
        return (
          <>
            <div className='logged'>
              <h2 className='header__logged-email'>{email}</h2> 
              <button className='header__link' onClick={() => authContext.logout()}>Выйти</button>
            </div>
          </>
        )
    
      default:
        break;
    }
  }

  return (
      <header className="header">
        <img className="header__img" src={logoWhite} alt="Логотип Место" />
        {getContent()}
      </header>
  );
}

export default Header;
