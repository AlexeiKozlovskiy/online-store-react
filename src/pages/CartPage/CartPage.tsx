import './CartPage.scss';
import { Link } from 'react-router-dom';
import { CartItem, ISelect, ROUTE, RootReducerProps } from '@/types/types';
import { ITEMS_IN_PAGE_CART } from '@/helpers/constant';
import { CartItemList } from '../../components/CartList/CartList';
import { useSelector } from 'react-redux';
import { ArrowBack } from '@/components/ArrowBack/ArrowBack';
import { Pagination } from '@/components/Pagination/Pagination';
import { CustomSelect } from '@/components/Select/Select';
import { useMyURLContext } from '@/context/URLContext';
import { Summary } from '../../components/CartSummary/Summary';
import { PaymentModal } from '@/components/ModalWindow/Payment/PaymentModal';
import { useCloseOpenModalsContext } from '@/context/CloseOpenModalsContext';
import { useCartPaginationHook } from '@/hooks/CartPaginationHook';

export function CartPage() {
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const countCartItem = cartItemsState.length;
  const { perCartPageOption, setPerCartPageOption } = useMyURLContext();
  const { handelCloseModalPayment, openModals } = useCloseOpenModalsContext();
  const { countPages, curPageCart, currentItems, handlePageClick } = useCartPaginationHook();

  function handleChangeSelect(selectedOption: ISelect | null) {
    setPerCartPageOption(selectedOption!);
  }

  const emtyCart = (
    <div className="shopping-cart__empty">
      <div className="shopping-cart__empty-subtitle">
        You have no items in your shopping cart. Click
        <br />
        <Link to={ROUTE.MAIN}>here</Link> to continue shopping.
      </div>
    </div>
  );

  const takenCart = (
    <>
      {openModals.payment && <PaymentModal handelCloseModalPayment={handelCloseModalPayment} />}
      <div className="shopping-cart__container">
        <div className="shopping-cart__pagination-table-container">
          <div className="shopping-cart__pagination-container">
            <CustomSelect
              selectedItem={perCartPageOption}
              handleChange={handleChangeSelect}
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
                  <CartItemList key={cartItem.cartID} {...cartItem} />
                ))}
            </tbody>
          </table>
        </div>
        <Summary />
      </div>
      <Pagination curPage={curPageCart} countPages={countPages} handlePageClick={handlePageClick} />
    </>
  );

  return (
    <>
      <main className="shopping-cart wrapper">
        <h2 className="shopping-cart__header">SHOPPING CART</h2>
        <ArrowBack />
        {!countCartItem ? emtyCart : takenCart}
      </main>
    </>
  );
}
