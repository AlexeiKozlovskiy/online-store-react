import { createContext, useContext, ReactNode } from 'react';
import { useMyURLContext } from '@/context/URLContext';
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
export const useMyRemoveFiltSortContext = () => useContext(RemoveAllSelectedContext);

interface IRemoveAllSelectedContext {
  removeAllSelected: () => void;
}

export const RemoveAllSelectedContext = createContext<IRemoveAllSelectedContext>({
  removeAllSelected: () => null,
});

export const RemoveAllSelectedContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    setSelectedColors,
    setSelectedCollections,
    setSelectedCategory,
    setSelectedPrice,
    setSelectedSize,
    setSelectedStock,
    setInputSearchValue,
    setSortindViewOption,
    setCurPageMain,
    setPerMainPageOption,
    setPerCartPageOption,
    setCurPageCart,
  } = useMyURLContext();

  function removeAllSelected() {
    setInputSearchValue('');
    setSelectedColors([]);
    setSelectedCollections([]);
    setSelectedCategory([]);
    setSelectedPrice([PRICE_MIN, PRICE_MAX]);
    setSelectedSize([SIZE_MIN, SIZE_MAX]);
    setSelectedStock([STOCK_MIN, STOCK_MAX]);
    setSortindViewOption(SORT_OPTIONS[0]);
    setCurPageMain(1);
    setPerMainPageOption(ITEMS_IN_PAGE[2]);
    setPerCartPageOption(ITEMS_IN_PAGE_CART[1]);
    setCurPageCart(1);
  }
  return (
    <RemoveAllSelectedContext.Provider
      value={{
        removeAllSelected,
      }}
    >
      {children}
    </RemoveAllSelectedContext.Provider>
  );
};
