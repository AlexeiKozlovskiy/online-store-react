import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import { useSelector } from 'react-redux';
import { CartItemReducerProps, CartItem } from '@/components/types/types';
import { useEffect, useState } from 'react';

export function Header() {
  const cartItems = useSelector(
    (state: CartItemReducerProps) => state.cart
  ) as unknown as CartItem[];
  const [productCount, setProductCount] = useState(0);
  const [productAmount, setProductAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setProductCount(cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0));
    setProductAmount(
      cartItems.reduce((count, cartItem) => count + cartItem.product.price * cartItem.quantity, 0)
    );
  }, [cartItems]);

  const resetFiltersAndNavigateHome = () => {
    // Reset filters here
    // For example, if you have a function to reset filters, call it here
    // Example: resetFilters();

    // Navigate to the homepage using navigate
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__container wrapper">
        <Link to="/" className="header-link" onClick={resetFiltersAndNavigateHome}>
          <span className="header-logo">
            <span className="header-logo__title">Christmas</span>
            <span className="header-logo__img"></span>
            <span className="header-logo__subtitle">Decorations</span>
          </span>
        </Link>
        <Link to="/cart" className="header-cart">
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
