import './CartPage.scss';
import { Link } from 'react-router-dom';
import { CartItemReducerProps, CartItem, ISelect } from '@/components/types/types';
import { PROMOCODES, ITEMS_IN_PAGE_CART } from '@/components/helpers/constant';
import { CartListItem } from './CartListItem';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ArrowBack } from '@/components/ArrowBack/ArrowBack';
import { Pagination } from '@/components/Pagination/Pagination';
import { CustomSelect } from '@/components/Select/Select';
import { useMyURLContext } from '@/components/Context/URLContext';

export function CartPage() {
  const cartItems = useSelector(
    (state: CartItemReducerProps) => state.cart
  ) as unknown as CartItem[];
  const [currentItems, setCurrentItems] = useState<CartItem[]>([]);
  const [pageCount, setPageCount] = useState(cartItems.length);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [productCount, setProductCount] = useState(0);
  const [productAmount, setProductAmount] = useState(0);
  const { perCartPageOption, setPerCartPageOption, curPageCart, setCurPageCart } =
    useMyURLContext();

  useEffect(() => {
    perCartPageOption.value === 'all'
      ? setItemsPerPage(cartItems.length)
      : setItemsPerPage(+perCartPageOption.value);
  }, [perCartPageOption]);

  useEffect(() => {
    setProductCount(cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0));
    setProductAmount(
      cartItems.reduce((count, cartItem) => count + cartItem.product.price * cartItem.quantity, 0)
    );
  }, [cartItems]);

  useEffect(() => {
    const newOffset = ((curPageCart - 1) * itemsPerPage) % cartItems.length;
    setItemOffset(newOffset);
  }, [curPageCart, itemsPerPage]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(cartItems.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(cartItems.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, cartItems]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % cartItems.length;
    setItemOffset(newOffset);
    setCurPageCart(event.selected + 1);
  };

  function handleChangePagination(selectedOption: ISelect | null) {
    setPerCartPageOption(selectedOption!);
  }

  return (
    <>
      {!cartItems.length ? (
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
            <ArrowBack />
            <div className="shopping-cart__pagination-conteiner">
              <div className="shopping-cart__pagination">
                <CustomSelect
                  selectedItem={perCartPageOption}
                  handleChange={handleChangePagination}
                  options={ITEMS_IN_PAGE_CART}
                />
              </div>
            </div>
            <div className="shopping-cart__subheader">
              <span>№</span>
              <span>Item</span>
              <span>Price</span>
              <span>Qty</span>
              <span>Subtotal</span>
            </div>
            <div className="shopping-cart__list">
              {currentItems &&
                currentItems.map((cartItem: CartItem) => (
                  <CartListItem key={cartItem.id} {...cartItem} />
                ))}
            </div>
            <Pagination
              curPage={curPageCart}
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
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
                  {PROMOCODES.map(({ name, id }) => (
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
