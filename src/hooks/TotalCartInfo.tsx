import { useSelector } from 'react-redux';
import { CartItem, PromocodeData, RootReducerProps } from '@/types/types';
import { getTotalItems, getTotalPrice, getTotalPriseByPromocode } from '@/helpers/helpersFunc';

export function useTotalCartInfo() {
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const promocodeState = useSelector<RootReducerProps, PromocodeData>((state) => state.promocode);

  const totalItems = getTotalItems(cartItemsState);
  const totalPrice = getTotalPrice(cartItemsState);
  const totalPriseByPromocode = getTotalPriseByPromocode(cartItemsState, promocodeState);

  return { totalItems, totalPrice, totalPriseByPromocode };
}
