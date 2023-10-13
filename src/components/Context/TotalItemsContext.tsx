import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { CartItemReducerProps, CartItem } from '@/components/types/types';

export const useMyTotalItemsContext = () => useContext(TotalItemsContext);

interface ITotalItemsContext {
  totalItems: number;
}

export const TotalItemsContext = createContext<ITotalItemsContext>({
  totalItems: 0,
});

export const TotalItemsContextProvider = ({ children }: { children: ReactNode }) => {
  const [totalItems, setTotalItems] = useState(0);
  const cartItemsState = useSelector(
    (state: CartItemReducerProps) => state.cart
  ) as unknown as CartItem[];

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
