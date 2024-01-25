import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import {
  ISelect,
  SORTING_SELECT,
  Product,
  ProductsQweryParams,
  RootReducerProps,
} from '@/types/types';
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
import { useGetProductsQuery } from '@/api/ProductsAPI';
import { useSelector } from 'react-redux';

export const useMySortingsContext = () => useContext(SortingsContext);

interface ISortingsContext {
  sortProducts: Product[];
}

export const SortingsContext = createContext<ISortingsContext>({
  sortProducts: [],
});

export const SortingsContextProvider = ({ children }: { children: ReactNode }) => {
  const { sortindViewOption } = useMyURLContext();
  const [sortProducts, setSortProducts] = useState<Product[]>([]);
  const { qweryParams } = useSelector<RootReducerProps, ProductsQweryParams>(
    (state) => state.productsQweryParams
  );

  const { data: products = [] } = useGetProductsQuery(qweryParams, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    sortingView(sortindViewOption);
  }, [sortindViewOption, products.length]);

  function sortingView(viewOption: ISelect) {
    const { value } = viewOption;

    switch (value) {
      case SORTING_SELECT.NAME:
        const sortName = sortByName(products);
        setSortProducts(sortName);
        break;
      case SORTING_SELECT.PRICE_ASC:
        const priceAsc = sortByKey(products, sortByPriceAsc);
        setSortProducts(priceAsc);
        break;
      case SORTING_SELECT.PRICE_DESC:
        const priceDesc = sortByKey(products, sortByPriceDesc);
        setSortProducts(priceDesc);
        break;
      case SORTING_SELECT.STOCK_ASC:
        const stockAsc = sortByKey(products, sortByStockAsc);
        setSortProducts(stockAsc);
        break;
      case SORTING_SELECT.STOCK_DESC:
        const stockDesc = sortByKey(products, sortByStockDesc);
        setSortProducts(stockDesc);
        break;
      case '':
        const recomend = sortByFavorite(products);
        setSortProducts(recomend);
        break;
    }
  }

  return <SortingsContext.Provider value={{ sortProducts }}>{children}</SortingsContext.Provider>;
};
