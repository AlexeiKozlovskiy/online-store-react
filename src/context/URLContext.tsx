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
} from '@/helpers/constant';
import { ISelect, InputSearch, SelectedFilters } from '@/types/types';
import { useLocation } from 'react-router-dom';
import { setQweryParams } from '@/store/controller';

interface IURLContext extends InputSearch {
  sortindViewOption: ISelect;
  setSortindViewOption: (selectedOption: ISelect) => void;
  curPageMain: number;
  setCurPageMain: (value: number) => void;
  perMainPageOption: ISelect;
  setPerMainPageOption: (selectedOption: ISelect) => void;
  curPageCart: number;
  setCurPageCart: (value: number) => void;
  perCartPageOption: ISelect;
  setPerCartPageOption: (selectedOption: ISelect) => void;
  swichedView: string;
  setSwichedView: (value: string) => void;
  cartUrl: string;
  selectedFilters: SelectedFilters;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
}

export const useMyURLContext = () => useContext(URLContext);

export const URLContext = createContext<IURLContext>({
  inputSearchURL: '',
  setInputSearchURL: () => null,
  sortindViewOption: SORT_OPTIONS[0],
  setSortindViewOption: () => null,
  curPageMain: 1,
  setCurPageMain: () => null,
  perMainPageOption: ITEMS_IN_PAGE[2],
  setPerMainPageOption: () => null,
  curPageCart: 1,
  setCurPageCart: () => null,
  perCartPageOption: ITEMS_IN_PAGE_CART[1],
  setPerCartPageOption: () => null,
  swichedView: 'block',
  setSwichedView: () => null,
  cartUrl: '/cart',
  selectedFilters: {
    colorsSelected: [],
    collectionsSelected: [],
    categorySelected: [],
    priceSelected: [PRICE_MIN, PRICE_MAX],
    sizeSelected: [SIZE_MIN, SIZE_MAX],
    stockSelected: [STOCK_MIN, STOCK_MAX],
  },
  setSelectedFilters: () => null,
});

export const URLContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    colorsSelected: [],
    collectionsSelected: [],
    categorySelected: [],
    priceSelected: [PRICE_MIN, PRICE_MAX],
    sizeSelected: [SIZE_MIN, SIZE_MAX],
    stockSelected: [STOCK_MIN, STOCK_MAX],
  });
  const [inputSearchURL, setInputSearchURL] = useState<string | null>('');
  const [sortindViewOption, setSortindViewOption] = useState<ISelect>(SORT_OPTIONS[0]);
  const [curPageMain, setCurPageMain] = useState<number>(1);
  const [perMainPageOption, setPerMainPageOption] = useState<ISelect>(ITEMS_IN_PAGE[2]);
  const [curPageCart, setCurPageCart] = useState<number>(1);
  const [perCartPageOption, setPerCartPageOption] = useState<ISelect>(ITEMS_IN_PAGE_CART[1]);
  const [swichedView, setSwichedView] = useState('block');
  const [cartUrl, setCartUrl] = useState('/cart');
  const location = useLocation();

  const {
    colorsSelected,
    collectionsSelected,
    categorySelected,
    priceSelected,
    sizeSelected,
    stockSelected,
  } = selectedFilters;

  const [minPrice, maxPrice] = priceSelected;
  const [minSize, maxSize] = sizeSelected;
  const [minStock, maxStock] = stockSelected;

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
      const [swichedViews] = queryParams.getAll('switchView');

      updatedFilters(
        colors,
        collections,
        categories,
        valMinPrice,
        valMaxPrice,
        valMinSize,
        valMaxSize,
        valMinStock,
        valMaxStock
      );

      updatedRowBlockView(viewOption);
      updatedPagination(curPageMain, perMainOption, curPageCart, perCartOption);

      search && setInputSearchURL(search);
      swichedViews && setSwichedView(swichedViews);
    }

    setDataFromUrl();
  }, [location]);

  useEffect(() => {
    function setDataInURL() {
      const params = new URLSearchParams();
      setFiltersQweryInParams(params);
      setPagesQweryInParams(params);

      const newURL = `${location.pathname}?${params.toString()}`;
      window.history.replaceState(null, '', newURL);
    }
    setDataInURL();
  }, [
    colorsSelected,
    collectionsSelected,
    categorySelected,
    priceSelected,
    sizeSelected,
    stockSelected,
    inputSearchURL,
    sortindViewOption.value,
    curPageMain,
    perMainPageOption,
    curPageCart,
    perCartPageOption,
    swichedView,
  ]);

  useEffect(() => {
    function setDataInReduxState() {
      const queryString = new URLSearchParams();
      setFiltersQweryInParams(queryString);
      setQweryParams(queryString.toString());
    }
    setDataInReduxState();
  }, [
    colorsSelected,
    collectionsSelected,
    categorySelected,
    priceSelected,
    sizeSelected,
    stockSelected,
    inputSearchURL,
  ]);

  useEffect(() => {
    if (+perCartPageOption.value !== 3) {
      setCartUrl(`/cart?page=${curPageCart}&perPage=${perCartPageOption.value}`);
    }
    if (+perCartPageOption.value === 3 && curPageCart !== 1) {
      setCartUrl(`/cart?page=${curPageCart}`);
    }
    if (+perCartPageOption.value === 3 && curPageCart === 1) {
      setCartUrl(`/cart`);
    }
  }, [perCartPageOption, perCartPageOption, curPageCart]);

  const setFiltersQweryInParams = (params: URLSearchParams) => {
    if (colorsSelected.length) {
      params.set('colors', colorsSelected.join(','));
    }
    if (collectionsSelected.length) {
      params.set('collections', collectionsSelected.join(','));
    }
    if (categorySelected.length) {
      params.set('categories', categorySelected.join(','));
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
    if (inputSearchURL) {
      params.set('q', inputSearchURL);
    }
  };

  const setPagesQweryInParams = (params: URLSearchParams) => {
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
    if (swichedView === 'row') {
      params.set('switchView', swichedView);
    }
  };

  function updatedFilters(
    colors: string,
    collections: string,
    categories: string,
    valMinPrice: string[],
    valMaxPrice: string[],
    valMinSize: string[],
    valMaxSize: string[],
    valMinStock: string[],
    valMaxStock: string[]
  ) {
    let filters = { ...selectedFilters };

    if (colors) {
      filters = { ...filters, colorsSelected: colors.split(',') };
    }
    if (collections) {
      filters = { ...filters, collectionsSelected: collections.split(',').map(Number) };
    }
    if (categories) {
      filters = { ...filters, categorySelected: categories.split(',') };
    }
    if (valMinPrice.length || valMaxPrice.length) {
      filters = { ...filters, priceSelected: [+valMinPrice, +valMaxPrice] };
    }
    if (valMinSize.length || valMaxSize.length) {
      filters = { ...filters, sizeSelected: [+valMinSize, +valMaxSize] };
    }
    if (valMinStock.length || valMaxStock.length) {
      filters = { ...filters, stockSelected: [+valMinStock, +valMaxStock] };
    }
    setSelectedFilters(filters);
  }

  function updatedPagination(
    curPageMain: string,
    perMainOption: string,
    curPageCart: string,
    perCartOption: string
  ) {
    if (curPageMain && location.pathname === '/') {
      setCurPageMain(+curPageMain);
    }

    if (perMainOption && location.pathname === '/') {
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

  function updatedRowBlockView(viewOption: string) {
    viewOption &&
      setSortindViewOption({
        value: viewOption,
        label: SORT_OPTIONS.filter(({ value, label }) => {
          if (value === viewOption) {
            return label;
          }
        })[0].label,
      });
  }

  return (
    <URLContext.Provider
      value={{
        sortindViewOption,
        setSortindViewOption,
        inputSearchURL,
        setInputSearchURL,
        curPageMain,
        setCurPageMain,
        perMainPageOption,
        setPerMainPageOption,
        curPageCart,
        setCurPageCart,
        perCartPageOption,
        setPerCartPageOption,
        swichedView,
        setSwichedView,
        cartUrl,
        selectedFilters,
        setSelectedFilters,
      }}
    >
      {children}
    </URLContext.Provider>
  );
};
