import { useState, createContext, useContext, ReactNode, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootReducerProps, CartItem, PromocodeData } from '@/types/types';

export const useMyTotalPriceContext = () => useContext(TotalPriceContext);

interface ITotalPriceContext {
  totalPrice: number;
  totalPriceByPromocodes: number;
}

export const TotalPriceContext = createContext<ITotalPriceContext>({
  totalPrice: 0,
  totalPriceByPromocodes: 0,
});

export const TotalPriceContextProvider = ({ children }: { children: ReactNode }) => {
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const promocodeState = useSelector<RootReducerProps, PromocodeData>((state) => state.promocode);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceByPromocodes, setTotalPriceByPromocodes] = useState(0);

  const getTotalPrice = useMemo(() => {
    return cartItemsState.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);
  }, [cartItemsState]);

  const getTotalDiscount = useMemo(() => {
    return promocodeState.applied.reduce((acc, { discount }) => acc + discount, 0);
  }, [promocodeState]);

  useEffect(() => {
    setTotalPrice(getTotalPrice);
  }, [cartItemsState]);

  useEffect(() => {
    if (getTotalDiscount) {
      setTotalPriceByPromocodes(getTotalPrice - (getTotalDiscount / 100) * getTotalPrice);
    } else {
      setTotalPriceByPromocodes(getTotalPrice);
    }
  }, [promocodeState, cartItemsState]);

  return (
    <TotalPriceContext.Provider
      value={{
        totalPrice,
        totalPriceByPromocodes,
      }}
    >
      {children}
    </TotalPriceContext.Provider>
  );
};
