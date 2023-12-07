import './CartPage.scss';
import { Link } from 'react-router-dom';
import { CartItem, RootReducerProps } from '@/types/types';
import { ITEMS_IN_PAGE_CART } from '@/helpers/constant';
import { CartListItem } from './CartListItem';
import { useSelector } from 'react-redux';
import { ArrowBack } from '@/components/ArrowBack/ArrowBack';
import { Pagination } from '@/components/Pagination/Pagination';
import { CustomSelect } from '@/components/Select/Select';
import { useMyURLContext } from '@/context/URLContext';
import { Summary } from './Summary';
import { PaymentModal } from '@/components/ModalWindow/Payment/PaymentModal';
import { useCloseOpenModalsContext } from '@/context/CloseOpenModalsContext';
import { useMyUserContext } from '@/context/UserContext';
import { useCartPaginationHook } from '@/components/CustomHook/CartPaginationHook';
import { Client, Server } from 'react-hydration-provider';
import { Preloader } from '@/components/Preloader/Preloader';

export function CartPage() {
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const countCartItem = cartItemsState.length;
  const { perCartPageOption, setPerCartPageOption } = useMyURLContext();
  const { handelCloseModalPayment, openModals, setOpenModals } = useCloseOpenModalsContext();
  const { authenticated } = useMyUserContext();
  const { countPages, curPageCart, currentItems, handlePageClick } = useCartPaginationHook();

  function checkAuth() {
    if (!authenticated) {
      setOpenModals({ ...openModals, signIN: true });
    } else {
      setOpenModals({ ...openModals, payment: true });
    }
  }

  const emtyCart = (
    <>
      <div className="shopping-cart__empty-subtitle">
        You have no items in your shopping cart. Click
        <br />
        <Link to="/">here</Link> to continue shopping.
      </div>
    </>
  );

  const takenCart = (
    <>
      {openModals.payment && <PaymentModal handelCloseModalPayment={handelCloseModalPayment} />}
      <div className="shopping-cart__container">
        <div className="shopping-cart__pagination-table-container">
          <div className="shopping-cart__pagination-container">
            <CustomSelect
              selectedItem={perCartPageOption}
              handleChange={(selectedOption) => setPerCartPageOption(selectedOption!)}
              options={ITEMS_IN_PAGE_CART}
            />
          </div>
          <table className="shopping-cart__table">
            <thead className="cart-table__header-container">
              <tr className="cart-table__content">
                <th className="cart-table__number">№</th>
                <th className="cart-table__item">Item</th>
                <th className="cart-table__info">Info</th>
                <th className="cart-table__price">Price</th>
                <th className="cart-table__amount">Amount</th>
                <th className="cart-table__subtotal">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {currentItems &&
                currentItems.map((cartItem: CartItem) => (
                  <CartListItem key={cartItem.cartID} {...cartItem} />
                ))}
            </tbody>
          </table>
        </div>
        <Summary isHandelOrderClick={checkAuth} />
      </div>
      <Pagination curPage={curPageCart} countPages={countPages} handlePageClick={handlePageClick} />
    </>
  );

  return (
    <>
      <main className="shopping-cart wrapper">
        <h2 className="shopping-cart__header">SHOPPING CART</h2>
        <ArrowBack />
        <Client>{!countCartItem ? emtyCart : takenCart}</Client>
        <Server>
          <div className="shopping-cart__server-preloader">{<Preloader />}</div>
        </Server>
      </main>
    </>
  );
}
