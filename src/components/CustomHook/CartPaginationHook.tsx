import { useMyURLContext } from '@/context/URLContext';
import { CartItem, PageClickEvent, RootReducerProps } from '@/types/types';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

export function useCartPaginationHook() {
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const countCartItem = cartItemsState.length;
  const { perCartPageOption, curPageCart, setCurPageCart } = useMyURLContext();
  const [currentItems, setCurrentItems] = useState<CartItem[]>([]);
  const [countPages, setCountPages] = useState(cartItemsState.length);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(+perCartPageOption.value);

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
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(cartItemsState.slice(itemOffset, endOffset));
    setCountPages(Math.ceil(countCartItem / itemsPerPage));
    return () => {};
  }, [itemOffset, itemsPerPage, cartItemsState]);

  useEffect(() => {
    resetOnFirstPageByShowItems();
  }, [perCartPageOption, cartItemsState]);

  function resetOnFirstPageByShowItems() {
    handlePageClick({ selected: 0 });
  }

  const handlePageClick = (event: PageClickEvent) => {
    const newOffset = (event.selected * itemsPerPage) % countCartItem;
    setItemOffset(newOffset);
    setCurPageCart(event.selected + 1);
  };

  return { countPages, curPageCart, currentItems, handlePageClick };
}
