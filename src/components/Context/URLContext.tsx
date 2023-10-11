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
  ITEMS_IN_PAGE_CART,
} from '@/components/helpers/constant';
// import products from '@/assets/data/products.json';
import { Filters, ISelect, InputSearch } from '../types/types';

export const useMyURLContext = () => useContext(URLContext);

interface IURLContext extends Filters, InputSearch {
  sortindViewOption: ISelect;
  setSortindViewOption: (selectedOption: ISelect) => void;
  curPageMain: number;
  setCurPageMain: (value: number) => void;
  perMainPageOption: ISelect;
  setPerMainPageOption: (selectedOption: ISelect) => void;
  isEmptyFilters: boolean;
  curPageCart: number;
  setCurPageCart: (value: number) => void;
  perCartPageOption: ISelect;
  setPerCartPageOption: (selectedOption: ISelect) => void;
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
  curPageMain: 1,
  setCurPageMain: () => null,
  perMainPageOption: ITEMS_IN_PAGE[2],
  setPerMainPageOption: () => null,
  isEmptyFilters: true,
  curPageCart: 1,
  setCurPageCart: () => null,
  perCartPageOption: ITEMS_IN_PAGE_CART[1],
  setPerCartPageOption: () => null,
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
  const [curPageMain, setCurPageMain] = useState<number>(1);
  const [perMainPageOption, setPerMainPageOption] = useState<ISelect>(ITEMS_IN_PAGE[2]);
  const [isEmptyFilters, setIsEmptyFilters] = useState(true);
  const [curPageCart, setCurPageCart] = useState<number>(1);
  const [perCartPageOption, setPerCartPageOption] = useState<ISelect>(ITEMS_IN_PAGE_CART[1]);

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
      const [curPageMain] = queryParams.getAll('page');
      const [perMainOption] = queryParams.getAll('perPage');
      const [curPageCart] = queryParams.getAll('page');
      const [perCartOption] = queryParams.getAll('perPage');

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

      if (curPageMain && location.pathname === '/') {
        setCurPageMain(+curPageMain);
      }

      if (perMainOption && location.pathname === '/') {
        console.log(123);
        setPerMainPageOption({
          value: perMainOption,
          label: ITEMS_IN_PAGE.filter(({ value, label }) => {
            if (value === perMainOption) {
              return label;
            }
          })[0].label,
        });
      }

      if (curPageCart && location.pathname === '/cart') {
        setCurPageCart(+curPageCart);
      }

      if (perCartOption && location.pathname === '/cart') {
        setPerCartPageOption({
          value: perCartOption,
          label: ITEMS_IN_PAGE_CART.filter(({ value, label }) => {
            if (value === perCartOption) {
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

      if (curPageMain > 1 && location.pathname === '/') {
        params.set('page', curPageMain.toString());
      }

      if (+perMainPageOption.value !== 20 && location.pathname === '/') {
        params.set('perPage', perMainPageOption.value);
      }

      if (curPageCart > 1 && location.pathname === '/cart') {
        params.set('page', curPageCart.toString());
      }

      if (+perCartPageOption.value !== 3 && location.pathname === '/cart') {
        params.set('perPage', perCartPageOption.value);
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
    curPageMain,
    perMainPageOption,
    curPageCart,
    perCartPageOption,
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
        curPageMain,
        setCurPageMain,
        perMainPageOption,
        setPerMainPageOption,
        curPageCart,
        setCurPageCart,
        perCartPageOption,
        setPerCartPageOption,
      }}
    >
      {children}
    </URLContext.Provider>
  );
};
