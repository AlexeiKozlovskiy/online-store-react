import './CartPage.scss';
import { Link } from 'react-router-dom';
import { CartItem, ISelect, PageClickEvent, RootReducerProps } from '@/types/types';
import { ITEMS_IN_PAGE_CART } from '@/helpers/constant';
import { CartListItem } from './CartListItem';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ArrowBack } from '@/components/ArrowBack/ArrowBack';
import { Pagination } from '@/components/Pagination/Pagination';
import { CustomSelect } from '@/components/Select/Select';
import { useMyURLContext } from '@/context/URLContext';
import { Summary } from './Summary';
import { PaymentModal } from '@/components/ModalWindow/Payment/PaymentModal';
import { useCloseOpenModalsContext } from '@/context/CloseOpenModalsContext';

export function CartPage() {
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const countCartItem = cartItemsState.length;
  const { perCartPageOption, setPerCartPageOption, curPageCart, setCurPageCart } =
    useMyURLContext();
  const [currentItems, setCurrentItems] = useState<CartItem[]>([]);
  const [countPages, setCountPages] = useState(countCartItem);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(+perCartPageOption.value);
  const { openModalPayment, setOpenModalPayment, handelCloseModalPayment } =
    useCloseOpenModalsContext();

  useEffect(() => {
    if (perCartPageOption.value === 'all' && countCartItem) {
      setItemsPerPage(countCartItem);
    } else if (countCartItem) {
      setItemsPerPage(+perCartPageOption.value);
    }
  }, [perCartPageOption, countCartItem]);

  useEffect(() => {
    const newOffset = ((curPageCart - 1) * itemsPerPage) % countCartItem;
    setItemOffset(newOffset);
  }, [curPageCart, itemsPerPage]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(cartItemsState.slice(itemOffset, endOffset));
    setCountPages(Math.ceil(countCartItem / itemsPerPage));
  }, [itemOffset, itemsPerPage, cartItemsState]);

  const handlePageClick = (event: PageClickEvent) => {
    const newOffset = (event.selected * itemsPerPage) % countCartItem;
    setItemOffset(newOffset);
    setCurPageCart(event.selected + 1);
  };

  function handleChangePagination(selectedOption: ISelect | null) {
    setPerCartPageOption(selectedOption!);
  }

  const emtyCart = (
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
  );

  return (
    <>
      {!countCartItem ? (
        emtyCart
      ) : (
        <main>
          {openModalPayment && <PaymentModal handelCloseModalPayment={handelCloseModalPayment} />}
          <div className="shopping-cart wrapper">
            <div className="shopping-cart__header">SHOPPING CART</div>
            <ArrowBack />
            <div className="shopping-cart__pagination-container">
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
                  <CartListItem key={cartItem.cartID} {...cartItem} />
                ))}
            </div>
            <Pagination
              curPage={curPageCart}
              countPages={countPages}
              handlePageClick={handlePageClick}
            />
            <Summary isHandelOrderClick={() => setOpenModalPayment(true)} />
          </div>
        </main>
      )}
    </>
  );
}
