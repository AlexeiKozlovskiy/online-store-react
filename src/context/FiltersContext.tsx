import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import {
  PRICE_MIN,
  PRICE_MAX,
  SIZE_MIN,
  SIZE_MAX,
  STOCK_MIN,
  STOCK_MAX,
  CATEGORIES_STOCK,
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
import {
  setBalansersCategory,
  setBalansersCollection,
  setBalansersColor,
  setBalansersPrice,
  setBalansersSize,
  setBalansersStock,
} from '@/store/controller';

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
        setBalansersColor(colorsValues);
      }
      if (!collectionsSelected.length) {
        const collectionsValues = sortCollectionBalancer(collectionBalancer(products));
        setBalansersCollection(collectionsValues);
      }
      if (!categorySelected.length) {
        const categoryValues = categoryBalancer(products, CATEGORIES_STOCK);
        setBalansersCategory(categoryValues);
      }
      setBalansersPrice(dualRangesBalancer(products, 'price'));
      setBalansersSize(dualRangesBalancer(products, 'size'));
      setBalansersStock(dualRangesBalancer(products, 'stock'));
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
    const { value } = dataset;
    switch (dataset.params) {
      case 'colors':
        setSelectedFilters({
          ...selectedFilters,
          colorsSelected: colorsSelected.filter((el) => el !== value),
        });
        break;
      case 'collections':
        setSelectedFilters({
          ...selectedFilters,
          collectionsSelected: collectionsSelected.filter((el) => el !== Number(value)),
        });
        break;
      case 'categories':
        setSelectedFilters({
          ...selectedFilters,
          categorySelected: categorySelected.filter((el) => el !== value),
        });
        break;
      case 'price':
        setSelectedFilters({
          ...selectedFilters,
          priceSelected: [PRICE_MIN, PRICE_MAX],
        });
        break;
      case 'size':
        setSelectedFilters({
          ...selectedFilters,
          sizeSelected: [SIZE_MIN, SIZE_MAX],
        });
        break;
      case 'stock':
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
