import { Link } from 'react-router-dom';
import './Header.scss';

export function Header() {
  return (
    <header className="header">
      <div className="header__container wrapper">
        <Link to="/" className="header-link">
          <span className="header-logo">
            <span className="header-logo__title">Christmas</span>
            <span className="header-logo__img"></span>
            <span className="header-logo__subtitle">Decorations</span>
          </span>
        </Link>
        <Link to="/cart" className="header-cart">
          <div className="header-cart__img"></div>
          <div className="header-cart__amount-container">
            <p className="header-cart__amount">{0}</p>
          </div>
          <div className="header-cart__num">${0}</div>
        </Link>
      </div>
    </header>
  );
}