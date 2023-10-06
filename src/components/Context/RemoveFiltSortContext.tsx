import { createContext, useContext, ReactNode } from 'react';
import { useMyURLContext } from '@/components/Context/URLContext';
import {
  PRICE_MIN,
  PRICE_MAX,
  SIZE_MIN,
  SIZE_MAX,
  STOCK_MIN,
  STOCK_MAX,
} from '@/components/helpers/constant';

export const useMyRemoveFiltSortContext = () => useContext(RemoveFiltSortContext);

interface IRemoveFiltSortContext {
  removeFiltersAndSearchInput: () => void;
}

export const RemoveFiltSortContext = createContext<IRemoveFiltSortContext>({
  removeFiltersAndSearchInput: () => null,
});

export const RemoveFiltSortContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    setSelectedColors,
    setSelectedCollections,
    setSelectedCategory,
    setSelectedPrice,
    setSelectedSize,
    setSelectedStock,
    setInputSearchValue,
    setSortindViewOption,
  } = useMyURLContext();

  function removeFiltersAndSearchInput() {
    setInputSearchValue('');
    setSelectedColors([]);
    setSelectedCollections([]);
    setSelectedCategory([]);
    setSelectedPrice([PRICE_MIN, PRICE_MAX]);
    setSelectedSize([SIZE_MIN, SIZE_MAX]);
    setSelectedStock([STOCK_MIN, STOCK_MAX]);
    setSortindViewOption({
      value: '',
      label: 'Recommended',
    });
  }
  return (
    <RemoveFiltSortContext.Provider
      value={{
        removeFiltersAndSearchInput,
      }}
    >
      {children}
    </RemoveFiltSortContext.Provider>
  );
};
