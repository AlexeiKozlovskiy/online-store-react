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

interface IRemoveAllSelectedContext {
  removeAllSelected: () => void;
}

export const useMyRemoveFiltSortContext = () => useContext(RemoveAllSelectedContext);

export const RemoveAllSelectedContext = createContext<IRemoveAllSelectedContext>({
  removeAllSelected: () => null,
});

export const RemoveAllSelectedContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    setInputSearchValue,
    setSortindViewOption,
    setCurPageMain,
    setPerMainPageOption,
    setPerCartPageOption,
    setCurPageCart,
    setSelectedFilters,
  } = useMyURLContext();

  function removeAllSelected() {
    setSelectedFilters({
      colorsSelected: [],
      collectionsSelected: [],
      categorySelected: [],
      priceSelected: [PRICE_MIN, PRICE_MAX],
      sizeSelected: [SIZE_MIN, SIZE_MAX],
      stockSelected: [STOCK_MIN, STOCK_MAX],
    });
    setInputSearchValue('');
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
