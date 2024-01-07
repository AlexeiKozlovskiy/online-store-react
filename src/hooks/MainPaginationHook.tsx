import { useMySortingsContext } from '@/context/SortingsContext';
import { useMyURLContext } from '@/context/URLContext';
import { MAX_PAGES } from '@/helpers/constant';
import { handlerScrollUp } from '@/helpers/helpersFunc';
import { PageClickEvent, Product } from '@/types/types';
import { useState, useEffect, useLayoutEffect } from 'react';

interface MainPagination {
  clickFilters: boolean;
}

export function useMainPagination({ clickFilters }: MainPagination) {
  const [currentItems, setCurrentItems] = useState<Product[]>([]);
  const { sortProducts: products } = useMySortingsContext();
  const countProducts = products.length;
  const { curPageMain, setCurPageMain, perMainPageOption, inputSearchURL } = useMyURLContext();
  const [countPages, setCountPages] = useState(MAX_PAGES);
  const [itemsPerPage, setItemsPerPage] = useState(+perMainPageOption.value);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (perMainPageOption.value === 'all' && countProducts) {
      setItemsPerPage(countProducts);
    } else if (countProducts) {
      setItemsPerPage(+perMainPageOption.value);
    }
  }, [perMainPageOption, countProducts]);

  useEffect(() => {
    const newOffset = ((curPageMain - 1) * itemsPerPage) % countProducts;
    if (newOffset) {
      setItemOffset(newOffset);
    }
  }, [curPageMain, itemsPerPage, products]);

  useLayoutEffect(() => {
    if (countProducts && itemsPerPage) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(products.slice(itemOffset, endOffset));
      setCountPages(Math.ceil(countProducts / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, products]);

  useEffect(() => {
    inputSearchURL && resetOnFirstPage();
  }, [inputSearchURL, products]);

  useEffect(() => {
    clickFilters && handlePageClick({ selected: 0 });
  }, [clickFilters]);

  useEffect(() => {
    if (countProducts && countPages !== 1) {
      if (curPageMain > countPages) {
        resetOnFirstPage();
      }
    }
  }, [curPageMain, countProducts]);

  function resetOnFirstPage() {
    handlePageClick({ selected: 0 });
  }

  const handlePageClick = (event: PageClickEvent) => {
    const newOffset = (event.selected * itemsPerPage) % countProducts;
    setItemOffset(newOffset);
    setCurPageMain(event.selected + 1);
    handlerScrollUp();
  };

  return { countPages, curPageMain, currentItems, handlePageClick };
}
