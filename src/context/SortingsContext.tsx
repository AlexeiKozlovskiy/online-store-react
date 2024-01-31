import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { ISelect, Product, ProductsQweryParams, RootReducerProps } from '@/types/types';
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
import { SORTING_SELECT } from '@/helpers/constant';

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
    const { NAME, PRICE_ASC, PRICE_DESC, STOCK_ASC, STOCK_DESC } = SORTING_SELECT;

    switch (value) {
      case NAME:
        const sortName = sortByName(products);
        setSortProducts(sortName);
        break;
      case PRICE_ASC:
        const priceAsc = sortByKey(products, sortByPriceAsc);
        setSortProducts(priceAsc);
        break;
      case PRICE_DESC:
        const priceDesc = sortByKey(products, sortByPriceDesc);
        setSortProducts(priceDesc);
        break;
      case STOCK_ASC:
        const stockAsc = sortByKey(products, sortByStockAsc);
        setSortProducts(stockAsc);
        break;
      case STOCK_DESC:
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
