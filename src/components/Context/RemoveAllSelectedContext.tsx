import { createContext, useContext, ReactNode } from 'react';
import { useMyURLContext } from '@/components/Context/URLContext';
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
    setCurPage,
    setPerPageOption,
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
    setCurPage(1);
    setPerPageOption(ITEMS_IN_PAGE[2]);
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
