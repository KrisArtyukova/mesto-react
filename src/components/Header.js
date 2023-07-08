import logoWhite from '../images/logo-white.png';

function Header() {
  return (
      <header className="header">
        <img className="header__img" src={logoWhite} alt="Логотип Место" />
      </header>
  );
}

export default Header;
