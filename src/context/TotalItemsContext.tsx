import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootReducerProps, CartItem } from '@/types/types';

interface ITotalItemsContext {
  totalItems: number;
}

export const useMyTotalItemsContext = () => useContext(TotalItemsContext);

export const TotalItemsContext = createContext<ITotalItemsContext>({
  totalItems: 0,
});

export const TotalItemsContextProvider = ({ children }: { children: ReactNode }) => {
  const [totalItems, setTotalItems] = useState(0);
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);

  useEffect(() => {
    setTotalItems(cartItemsState.reduce((count, cartItem) => count + cartItem.quantity, 0));
  }, [cartItemsState]);

  return (
    <TotalItemsContext.Provider
      value={{
        totalItems,
      }}
    >
      {children}
    </TotalItemsContext.Provider>
  );
};
