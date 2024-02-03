import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import {
  PRICE_MIN,
  PRICE_MAX,
  SIZE_MIN,
  SIZE_MAX,
  STOCK_MIN,
  STOCK_MAX,
  CATEGORIES_STOCK,
  BALANCERS,
  PRODUCT_FILTER_FIELDS,
  PRODUCT_DUAL_RANGE_FILTER_FIELDS,
} from '@/helpers/constant';
import { RootReducerProps, ProductsQweryParams } from '@/types/types';
import {
  sortColorBalancer,
  sortCollectionBalancer,
  dualRangesBalancer,
  colorBalancer,
  collectionBalancer,
  categoryBalancer,
} from '@/helpers/helpersFunc';
import { useMyURLContext } from '@/context/URLContext';
import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '@/api/ProductsAPI';
import { updateBalancersPropertys } from '@/store/controller';

interface IFiltersContext {
  itemsCount: number;
  removeItemFilterClick: (e: React.MouseEvent<HTMLElement>) => void;
  emptyCatalog: boolean;
}

export const useMyFiltersContext = () => useContext(FiltersContext);

export const FiltersContext = createContext<IFiltersContext>({
  itemsCount: 0,
  removeItemFilterClick: () => null,
  emptyCatalog: false,
});

export const FiltersContextProvider = ({ children }: { children: ReactNode }) => {
  const { selectedFilters, setSelectedFilters } = useMyURLContext();
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [emptyCatalog, setEmptyCatalog] = useState<boolean>(false);
  const { qweryParams } = useSelector<RootReducerProps, ProductsQweryParams>(
    (state) => state.productsQweryParams
  );
  const { data: products = [], isFetching } = useGetProductsQuery(qweryParams, {
    refetchOnMountOrArgChange: true,
  });

  const { colorsSelected, collectionsSelected, categorySelected } = selectedFilters;
  const {
    BALANCER_COLOR,
    BALANCER_COLLECTION,
    BALANCER_CATEGORY,
    BALANCER_PRICE,
    BALANCER_SIZE,
    BALANCER_STOCK,
  } = BALANCERS;

  const { COLOR, COLLECTION, CATEGORY, PRICE, SIZE, STOCK } = Object.assign(
    PRODUCT_FILTER_FIELDS,
    PRODUCT_DUAL_RANGE_FILTER_FIELDS
  );

  useEffect(() => {
    if (products.length) {
      refreshBalanser();
    }
  }, [products.length]);

  useEffect(() => {
    countProducts();
  }, [products.length]);

  function refreshBalanser() {
    if (products.length) {
      if (!colorsSelected.length) {
        const colorsValues = sortColorBalancer(colorBalancer(products));
        updateBalancersPropertys(BALANCER_COLOR, colorsValues);
      }
      if (!collectionsSelected.length) {
        const collectionsValues = sortCollectionBalancer(collectionBalancer(products));
        updateBalancersPropertys(BALANCER_COLLECTION, collectionsValues);
      }
      if (!categorySelected.length) {
        const categoryValues = categoryBalancer(products, CATEGORIES_STOCK);
        updateBalancersPropertys(BALANCER_CATEGORY, categoryValues);
      }
      const priseValues = dualRangesBalancer(products, PRICE);
      updateBalancersPropertys(BALANCER_PRICE, priseValues);
      const sizeValues = dualRangesBalancer(products, SIZE);
      updateBalancersPropertys(BALANCER_SIZE, sizeValues);
      const stockValues = dualRangesBalancer(products, STOCK);
      updateBalancersPropertys(BALANCER_STOCK, stockValues);
    }
  }

  function countProducts() {
    setItemsCount(products.length);
    if (!products.length && !isFetching) {
      setEmptyCatalog(true);
    } else {
      setEmptyCatalog(false);
    }
  }

  function removeItemFilterClick(e: React.MouseEvent<HTMLElement>) {
    const { dataset } = e.target as HTMLElement;
    const { value, params } = dataset;
    switch (params) {
      case COLOR:
        setSelectedFilters({
          ...selectedFilters,
          colorsSelected: colorsSelected.filter((el) => el !== value),
        });
        break;
      case COLLECTION:
        setSelectedFilters({
          ...selectedFilters,
          collectionsSelected: collectionsSelected.filter((el) => el !== Number(value)),
        });
        break;
      case CATEGORY:
        setSelectedFilters({
          ...selectedFilters,
          categorySelected: categorySelected.filter((el) => el !== value),
        });
        break;
      case PRICE:
        setSelectedFilters({
          ...selectedFilters,
          priceSelected: [PRICE_MIN, PRICE_MAX],
        });
        break;
      case SIZE:
        setSelectedFilters({
          ...selectedFilters,
          sizeSelected: [SIZE_MIN, SIZE_MAX],
        });
        break;
      case STOCK:
        setSelectedFilters({
          ...selectedFilters,
          stockSelected: [STOCK_MIN, STOCK_MAX],
        });
        break;
    }
  }

  return (
    <FiltersContext.Provider
      value={{
        removeItemFilterClick,
        itemsCount,
        emptyCatalog,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
