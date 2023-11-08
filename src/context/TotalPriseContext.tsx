import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
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

  useEffect(() => {
    const totalPrice = getTotalPrice();
    setTotalPrice(totalPrice);
  }, [cartItemsState]);

  useEffect(() => {
    const discount = promocodeState.applied?.reduce((acc, cur) => acc + cur.discount, 0);
    if (discount) {
      setTotalPriceByPromocodes(getTotalPrice() - (discount / 100) * getTotalPrice());
    } else {
      const totalPrices = getTotalPrice();
      setTotalPriceByPromocodes(totalPrices);
    }
  }, [promocodeState, cartItemsState]);

  function getTotalPrice() {
    return cartItemsState.reduce(
      (count, cartItem) => count + cartItem.product.price * cartItem.quantity,
      0
    );
  }

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
