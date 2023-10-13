import './CartPage.scss';
import { Link } from 'react-router-dom';
import { CartItemReducerProps, CartItem, ISelect } from '@/components/types/types';
import { ITEMS_IN_PAGE_CART } from '@/components/helpers/constant';
import { CartListItem } from './CartListItem';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ArrowBack } from '@/components/ArrowBack/ArrowBack';
import { Pagination } from '@/components/Pagination/Pagination';
import { CustomSelect } from '@/components/Select/Select';
import { useMyURLContext } from '@/components/Context/URLContext';
import { Summary } from './Summary';

export function CartPage() {
  const cartItemsState = useSelector(
    (state: CartItemReducerProps) => state.cart
  ) as unknown as CartItem[];
  const { perCartPageOption, setPerCartPageOption, curPageCart, setCurPageCart } =
    useMyURLContext();
  const [currentItems, setCurrentItems] = useState<CartItem[]>([]);
  const [pageCount, setPageCount] = useState(cartItemsState.length);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    perCartPageOption.value === 'all'
      ? setItemsPerPage(cartItemsState.length)
      : setItemsPerPage(+perCartPageOption.value);
  }, [perCartPageOption]);

  useEffect(() => {
    const newOffset = ((curPageCart - 1) * itemsPerPage) % cartItemsState.length;
    setItemOffset(newOffset);
  }, [curPageCart, itemsPerPage]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(cartItemsState.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(cartItemsState.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, cartItemsState]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % cartItemsState.length;
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
      {!cartItemsState.length ? (
        emtyCart
      ) : (
        <main>
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
                  <CartListItem key={cartItem.id} {...cartItem} />
                ))}
            </div>
            <Pagination
              curPage={curPageCart}
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
            <Summary />
          </div>
        </main>
      )}
    </>
  );
}
