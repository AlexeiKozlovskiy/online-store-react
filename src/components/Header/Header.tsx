import { Link } from 'react-router-dom';
import './Header.scss';
import { useSelector } from 'react-redux';
import { CartItemReducerProps, CartItem } from '@/components/types/types';
import { useEffect, useState } from 'react';
import { useMyRemoveFiltSortContext } from '@/components/Context/RemoveAllSelectedContext';
import { useMyURLContext } from '@/components/Context/URLContext';

export function Header() {
  const { curPageCart, perCartPageOption } = useMyURLContext();

  const cartItems = useSelector(
    (state: CartItemReducerProps) => state.cart
  ) as unknown as CartItem[];
  const [productCount, setProductCount] = useState(0);
  const [productAmount, setProductAmount] = useState(0);
  const { removeAllSelected } = useMyRemoveFiltSortContext();

  useEffect(() => {
    setProductCount(cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0));
    setProductAmount(
      cartItems.reduce((count, cartItem) => count + cartItem.product.price * cartItem.quantity, 0)
    );
  }, [cartItems]);

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
            <p className="header-cart__amount">{productCount}</p>
          </div>
          <div className="header-cart__num">${productAmount.toFixed(2)}</div>
        </Link>
      </div>
    </header>
  );
}
