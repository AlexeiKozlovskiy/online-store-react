import { useMySortingsContext } from '@/context/SortingsContext';
import { useMyURLContext } from '@/context/URLContext';
import { PageClickEvent, Product } from '@/types/types';
import { useState, useEffect, useLayoutEffect } from 'react';

export function useMainPagination() {
  const [currentItems, setCurrentItems] = useState<Product[]>([]);
  const { sortProducts: products } = useMySortingsContext();
  const { curPageMain, setCurPageMain, perMainPageOption, inputSearchValue, isEmptyFilters } =
    useMyURLContext();
  const [countPages, setCountPages] = useState(curPageMain);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(+perMainPageOption.value);

  const countProducts = products.length;

  useEffect(() => {
    if (perMainPageOption.value === 'all' && countProducts) {
      setItemsPerPage(countProducts);
    } else if (countProducts) {
      setItemsPerPage(+perMainPageOption.value);
    }
  }, [perMainPageOption, countProducts]);

  useLayoutEffect(() => {
    const newOffset = ((curPageMain - 1) * itemsPerPage) % countProducts;
    if (newOffset) {
      setItemOffset(newOffset);
    }
  }, [curPageMain, itemsPerPage, products]);

  useEffect(() => {
    if (countProducts && itemsPerPage) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(products.slice(itemOffset, endOffset));
      setCountPages(Math.ceil(countProducts / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, products]);

  useEffect(() => {
    resetOnFirstPageBySearch();
  }, [inputSearchValue, products]);

  useEffect(() => {
    resetOnFirstPageByFilters();
  }, [isEmptyFilters, products]);

  function resetOnFirstPageBySearch() {
    inputSearchValue && handlePageClick({ selected: 0 });
  }

  function resetOnFirstPageByFilters() {
    !isEmptyFilters && handlePageClick({ selected: 0 });
  }

  const handlePageClick = (event: PageClickEvent) => {
    const newOffset = (event.selected * itemsPerPage) % countProducts;
    setItemOffset(newOffset);
    setCurPageMain(event.selected + 1);
  };

  return { countPages, curPageMain, currentItems, handlePageClick };
}
