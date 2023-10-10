import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import {
  PRICE_MIN,
  PRICE_MAX,
  SIZE_MIN,
  SIZE_MAX,
  STOCK_MIN,
  STOCK_MAX,
  SORT_OPTIONS,
  ITEMS_IN_PAGE,
} from '@/components/helpers/constant';
import { Filters, ISelect, InputSearch } from '../types/types';

export const useMyURLContext = () => useContext(URLContext);

interface IURLContext extends Filters, InputSearch {
  sortindViewOption: ISelect;
  setSortindViewOption: (selectedOption: ISelect) => void;
  curPage: number;
  setCurPage: (value: number) => void;
  perPageOption: ISelect;
  setPerPageOption: (selectedOption: ISelect) => void;
  isEmptyFilters: boolean;
}

export const URLContext = createContext<IURLContext>({
  inputSearchValue: '',
  setInputSearchValue: () => null,
  selectedColors: [],
  selectedCollections: [],
  selectedCategory: [],
  selectedPrice: [PRICE_MIN, PRICE_MAX],
  selectedSize: [SIZE_MIN, SIZE_MAX],
  selectedStock: [STOCK_MIN, STOCK_MAX],
  setSelectedColors: () => null,
  setSelectedCollections: () => null,
  setSelectedCategory: () => null,
  setSelectedPrice: () => null,
  setSelectedSize: () => null,
  setSelectedStock: () => null,
  sortindViewOption: SORT_OPTIONS[0],
  setSortindViewOption: () => null,
  curPage: 1,
  setCurPage: () => null,
  perPageOption: ITEMS_IN_PAGE[2],
  setPerPageOption: () => null,
  isEmptyFilters: true,
});

export const URLContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<[number | null, number | null]>([
    PRICE_MIN,
    PRICE_MAX,
  ]);
  const [selectedSize, setSelectedSize] = useState<[number | null, number | null]>([
    SIZE_MIN,
    SIZE_MAX,
  ]);
  const [selectedStock, setSelectedStock] = useState<[number | null, number | null]>([
    STOCK_MIN,
    STOCK_MAX,
  ]);
  const [inputSearchValue, setInputSearchValue] = useState<string | null>('');
  const [sortindViewOption, setSortindViewOption] = useState<ISelect>(SORT_OPTIONS[0]);
  const [curPage, setCurPage] = useState<number>(1);
  const [perPageOption, setPerPageOption] = useState<ISelect>(ITEMS_IN_PAGE[2]);
  const [isEmptyFilters, setIsEmptyFilters] = useState(true);

  const [minPrice, maxPrice] = selectedPrice;
  const [minSize, maxSize] = selectedSize;
  const [minStock, maxStock] = selectedStock;

  useEffect(() => {
    function checkIsEmptyFilters() {
      if (
        !selectedColors.length &&
        !selectedCollections.length &&
        !selectedCategory.length &&
        minPrice === PRICE_MIN &&
        maxPrice === PRICE_MAX &&
        minSize === SIZE_MIN &&
        maxSize === SIZE_MAX &&
        minStock === STOCK_MIN &&
        maxStock === STOCK_MAX
      ) {
        setIsEmptyFilters(false);
      } else {
        setIsEmptyFilters(true);
      }
    }
    checkIsEmptyFilters();
  }, [
    selectedColors,
    selectedCollections,
    selectedCategory,
    selectedPrice,
    selectedSize,
    selectedStock,
  ]);

  useEffect(() => {
    function setDataFromUrl() {
      const queryParams = new URLSearchParams(location.search);
      const [colors] = queryParams.getAll('colors');
      const [collections] = queryParams.getAll('collections');
      const [categories] = queryParams.getAll('categories');
      const valMinPrice = queryParams.getAll('minPrice');
      const valMaxPrice = queryParams.getAll('maxPrice');
      const valMinSize = queryParams.getAll('minSize');
      const valMaxSize = queryParams.getAll('maxSize');
      const valMinStock = queryParams.getAll('minStock');
      const valMaxStock = queryParams.getAll('maxStock');
      const [search] = queryParams.getAll('q');
      const [viewOption] = queryParams.getAll('sortBy');
      const [curPage] = queryParams.getAll('page');
      const [perPageOption] = queryParams.getAll('perPage');

      if (colors) {
        setSelectedColors(colors?.split(','));
      }
      if (collections) {
        setSelectedCollections(collections?.split(',').map(Number));
      }
      if (categories) {
        setSelectedCategory(categories?.split(','));
      }
      if (valMinPrice.length || valMaxPrice.length) {
        setSelectedPrice([+valMinPrice, +valMaxPrice]);
      }
      if (valMinSize.length || valMaxSize.length) {
        setSelectedSize([+valMinSize, +valMaxSize]);
      }
      if (valMinStock.length || valMaxStock.length) {
        setSelectedStock([+valMinStock, +valMaxStock]);
      }
      if (search) {
        setInputSearchValue(search);
      }
      if (viewOption) {
        setSortindViewOption({
          value: viewOption,
          label: SORT_OPTIONS.filter(({ value, label }) => {
            if (value === viewOption) {
              return label;
            }
          })[0].label,
        });
      }
      if (curPage) {
        setCurPage(+curPage);
      }
      if (perPageOption) {
        setPerPageOption({
          value: perPageOption,
          label: ITEMS_IN_PAGE.filter(({ value, label }) => {
            if (value === perPageOption) {
              return label;
            }
          })[0].label,
        });
      }
    }
    setDataFromUrl();
  }, [location.reload]);

  useEffect(() => {
    function setDataInURL() {
      const params = new URLSearchParams();
      const [minPrice, maxPrice] = selectedPrice;
      const [minSize, maxSize] = selectedSize;
      const [minStock, maxStock] = selectedStock;

      if (selectedColors.length) {
        params.set('colors', selectedColors.join(','));
      }
      if (selectedCollections.length) {
        params.set('collections', selectedCollections.join(','));
      }
      if (selectedCategory.length) {
        params.set('categories', selectedCategory.join(','));
      }
      if (minPrice !== PRICE_MIN || maxPrice !== PRICE_MAX) {
        if (minPrice && maxPrice) {
          params.set('minPrice', minPrice!.toString());
          params.set('maxPrice', maxPrice!.toString());
        }
      }
      if (minSize !== SIZE_MIN || maxSize !== SIZE_MAX) {
        if (minSize && maxSize) {
          params.set('minSize', minSize!.toString());
          params.set('maxSize', maxSize!.toString());
        }
      }
      if (minStock !== STOCK_MIN || maxStock !== STOCK_MAX) {
        if (minStock && maxStock) {
          params.set('minStock', minStock!.toString());
          params.set('maxStock', maxStock!.toString());
        }
      }
      if (inputSearchValue) {
        params.set('q', inputSearchValue);
      }
      if (sortindViewOption.value.length) {
        params.set('sortBy', sortindViewOption.value);
      }

      if (curPage > 1) {
        params.set('page', curPage.toString());
      }

      if (+perPageOption.value !== 20) {
        params.set('perPage', perPageOption.value);
      }

      const newURL = `${location.pathname}?${params.toString()}`;
      window.history.replaceState(null, '', newURL);
    }
    setDataInURL();
  }, [
    selectedColors,
    selectedCollections,
    selectedCategory,
    selectedPrice,
    selectedSize,
    selectedStock,
    inputSearchValue,
    sortindViewOption.value,
    curPage,
    perPageOption,
  ]);

  return (
    <URLContext.Provider
      value={{
        isEmptyFilters,
        selectedColors,
        selectedCollections,
        selectedCategory,
        selectedPrice,
        selectedSize,
        selectedStock,
        setSelectedColors,
        setSelectedCollections,
        setSelectedCategory,
        setSelectedPrice,
        setSelectedSize,
        setSelectedStock,
        sortindViewOption,
        setSortindViewOption,
        inputSearchValue,
        setInputSearchValue,
        curPage,
        setCurPage,
        perPageOption,
        setPerPageOption,
      }}
    >
      {children}
    </URLContext.Provider>
  );
};
