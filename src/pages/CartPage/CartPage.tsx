import './CartPage.scss';
import { Link } from 'react-router-dom';
import { Promocode, CartItemReducerProps, CartItem } from '@/components/types/types';
import { CartListItem } from './CartListItem';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// Test data
const itemsInPage = [1, 3, 5, 10, 0];
const availablePromocodes: Promocode[] = [
  {
    id: 1,
    name: 'one',
    discount: 10,
  },
  {
    id: 2,
    name: 'two',
    discount: 15,
  },
];

export function CartPage() {
  const cartItems = useSelector((state: CartItemReducerProps) => state.cart) as unknown as CartItem[];

  const [productCount, setProductCount] = useState(0);
  const [productAmount, setProductAmount] = useState(0);

  useEffect(() => {
    setProductCount(cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0));
    setProductAmount(
      cartItems.reduce((count, cartItem) => count + cartItem.product.price * cartItem.quantity, 0)
    );
  }, [cartItems]);

  return (
    <>
      {!cartItems ? (
        <main>
          <div className="shopping-cart__empty">
            <div className="shopping-cart__empty-title">SHOPPING CART</div>
            <div className="shopping-cart__empty-subtitle">
              You have no items in your shopping cart. Click
              <br />
              <Link to="/">here</Link> to continue shopping.
            </div>
          </div>
        </main>
      ) : (
        <main>
          <div className="shopping-cart wrapper">
            <div className="shopping-cart__header">SHOPPING CART</div>
            <div className="shopping-cart__pagination">
              <select className="pagination-select">
                {itemsInPage?.map((value, ind) => (
                  <option key={ind} value={value}>
                    Show items: {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="shopping-cart__subheader">
              <span>№</span>
              <span>Item</span>
              <span>Price</span>
              <span>Qty</span>
              <span>Subtotal</span>
            </div>
            <div className="shopping-cart__list">
              {cartItems.map((cartItem: CartItem) => (
                <CartListItem key={cartItem.id} {...cartItem} />
              ))}
            </div>
            <div className="shopping-cart__summary">
              <div className="summery-info">
                <div className="summery-info__header">SUMMARY</div>
                <div className="summery-info__order-container">
                  <div className="order-container__content">
                    <div className="order-container__items-count items-count">
                      <div className="items-count__title">Items Total</div>
                      <div className="items-count__count">{productCount}</div>
                    </div>
                    <div className="order-container__total-count total-count">
                      <div className="total-count__text">Order Total</div>
                      <div className="total-count__total-value">${productAmount.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="order-container__promocode promocode-order"></div>
                  <div className="order-container-button">
                    <button className="button-order">Proceed to Checkout</button>
                  </div>
                </div>
              </div>
              <div className="shopping-promo">
                <input className="input-promo" type="text" placeholder="  Enter promo code" />
                <button className="button-apply">Apply</button>
                <div className="promo-test">
                  Promo for test:
                  {availablePromocodes.map(({ name, id }) => (
                    <span key={id}>
                      <div className="promo-test__name">{name}</div>{' '}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
