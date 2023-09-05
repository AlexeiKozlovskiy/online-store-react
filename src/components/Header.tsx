import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        <ul className="header-nav-list">
          <li className="header-nav-list__item">
            <Link to="/">Home</Link>
          </li>
          <li className="header-nav-list__item">
            <Link to="/unknown">PAGE 404 TEST</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;