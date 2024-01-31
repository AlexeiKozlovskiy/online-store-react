import { useMyURLContext } from '@/context/URLContext';
import { handlerScrollUp } from '@/helpers/helpersFunc';
import { CartItem, PageClickEvent, RootReducerProps } from '@/types/types';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

export function useCartPagination() {
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const countCartItem = cartItemsState.length;
  const { perCartPageOption, curPageCart, setCurPageCart } = useMyURLContext();
  const [currentItems, setCurrentItems] = useState<CartItem[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(+perCartPageOption.value);
  const [countPages, setCountPages] = useState(Math.ceil(countCartItem / itemsPerPage));
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (curPageCart > countPages) {
      resetOnFirstPageByShowItems();
    }
  }, [countPages, curPageCart]);

  useEffect(() => {
    if (perCartPageOption.value === 'all' && countCartItem) {
      setItemsPerPage(countCartItem);
    } else if (countCartItem) {
      setItemsPerPage(+perCartPageOption.value);
    }
  }, [perCartPageOption, countCartItem]);

  useLayoutEffect(() => {
    const newOffset = ((curPageCart - 1) * itemsPerPage) % countCartItem;
    setItemOffset(newOffset);
  }, [curPageCart, itemsPerPage, countCartItem]);

  useLayoutEffect(() => {
    if (countCartItem) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(cartItemsState.slice(itemOffset, endOffset));
      setCountPages(Math.ceil(countCartItem / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, cartItemsState]);

  const handlePageClick = (event: PageClickEvent) => {
    const newOffset = (event.selected * itemsPerPage) % countCartItem;
    setItemOffset(newOffset);
    setCurPageCart(event.selected + 1);
    handlerScrollUp();
  };

  function resetOnFirstPageByShowItems() {
    handlePageClick({ selected: 0 });
  }

  return { countPages, curPageCart, currentItems, handlePageClick };
}
