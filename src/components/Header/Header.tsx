import { Link } from 'react-router-dom';
import './Header.scss';
import { useMyRemoveFiltSortContext } from '@/context/RemoveAllSelectedContext';
import { useMyURLContext } from '@/context/URLContext';
import { useMyTotalPriceContext } from '@/context/TotalPriseContext';
import { useMyTotalItemsContext } from '@/context/TotalItemsContext';

export function Header() {
  const { curPageCart, perCartPageOption } = useMyURLContext();
  const { removeAllSelected } = useMyRemoveFiltSortContext();
  const { totalPriceByPromocodes } = useMyTotalPriceContext();
  const { totalItems } = useMyTotalItemsContext();

  function getCartUrl() {
    let url = `/cart`;
    if (+perCartPageOption.value !== 3) {
      url = `/cart?page=${curPageCart}&perPage=${perCartPageOption.value}`;
    }
    return url;
  }

  return (
    <header className="header">
      <div className="header__container wrapper">
        <Link to="/" className="header-link" onClick={removeAllSelected}>
          <span className="header-logo">
            <span className="header-logo__title">Christmas</span>
            <span className="header-logo__img"></span>
            <span className="header-logo__subtitle">Decorations</span>
          </span>
        </Link>
        <Link to={getCartUrl()} className="header-cart">
          <div className="header-cart__img"></div>
          <div className="header-cart__amount-container">
            <p className="header-cart__amount">{totalItems}</p>
          </div>
          <div className="header-cart__num">${totalPriceByPromocodes.toFixed(2)}</div>
        </Link>
      </div>
    </header>
  );
}
