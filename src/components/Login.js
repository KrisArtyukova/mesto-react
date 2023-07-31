import React from 'react';
import Header from './Header';
import EnterForm from './EnterForm';
import { LoginPage } from '../utils/constants';
import InfoPopup from './InfoPopup';

function Login({ infoPopupIsOpen, infoPopupTitle, infoPopupError, onLoginUser, closeInfoPopup }) {
  return (
    <>
        <Header currentPage={LoginPage}/>
        <EnterForm title='Вход' buttonText='Вход' isLoginPage={true} onLoginUser={onLoginUser} />
        <InfoPopup infoPopupIsOpen={infoPopupIsOpen} infoPopupTitle={infoPopupTitle} infoPopupError={infoPopupError} closeInfoPopup={closeInfoPopup} />
    </>
  );
}

export default Login;
