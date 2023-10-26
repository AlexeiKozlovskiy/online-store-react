import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { ISelect, Select, Product } from '../types/types';
import {
  sortByFavorite,
  sortByName,
  sortByKey,
  sortByPriceAsc,
  sortByPriceDesc,
  sortByStockAsc,
  sortByStockDesc,
} from '@/helpers/helpersFunc';
import { useMyURLContext } from '@/context/URLContext';
import { useMyFiltersContext } from './FiltersContext';

export const useMySortingsContext = () => useContext(SortingsContext);

interface ISortingsContext {
  sortingView: (selectedOption: ISelect) => void;
  sortProducts: Product[];
}

export const SortingsContext = createContext<ISortingsContext>({
  sortingView: () => null,
  sortProducts: [],
});

export const SortingsContextProvider = ({ children }: { children: ReactNode }) => {
  const { sortindViewOption } = useMyURLContext();
  const { filtersProducts } = useMyFiltersContext();
  const [sortProducts, setSortProducts] = useState<Product[]>([]);

  useEffect(() => {
    sortingView(sortindViewOption);
  }, [sortindViewOption, filtersProducts]);

  function sortingView(viewOption: ISelect) {
    const { value } = viewOption;

    switch (value) {
      case Select.NAME:
        const sortName = sortByName(filtersProducts);
        setSortProducts(sortName);
        break;
      case Select.PRICE_ASC:
        const priceAsc = sortByKey(filtersProducts, sortByPriceAsc);
        setSortProducts(priceAsc);
        break;
      case Select.PRICE_DESC:
        const priceDesc = sortByKey(filtersProducts, sortByPriceDesc);
        setSortProducts(priceDesc);
        break;
      case Select.STOCK_ASC:
        const stockAsc = sortByKey(filtersProducts, sortByStockAsc);
        setSortProducts(stockAsc);
        break;
      case Select.STOCK_DESC:
        const stockDesc = sortByKey(filtersProducts, sortByStockDesc);
        setSortProducts(stockDesc);
        break;
      case '':
        const recomend = sortByFavorite(filtersProducts);
        setSortProducts(recomend);
        break;
    }
  }

  return (
    <SortingsContext.Provider
      value={{
        sortingView,
        sortProducts,
      }}
    >
      {children}
    </SortingsContext.Provider>
  );
};
