import { CartItem, PromocodeData, RootReducerProps } from '@/types/types';
import { useSelector } from 'react-redux';

export function useTotalCartInfo() {
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const promocodeState = useSelector<RootReducerProps, PromocodeData>((state) => state.promocode);

  const totalItems = getTotalItems(cartItemsState);
  const totalPrice = getTotalPrice(cartItemsState);
  const totalPriseByPromocode = getTotalPriseByPromocode(cartItemsState, promocodeState);

  function getTotalPrice(cartItemsState: CartItem[]) {
    return cartItemsState.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);
  }

  function getTotalDiscount(promocodeState: PromocodeData) {
    return promocodeState.applied.reduce((acc, { discount }) => acc + discount, 0);
  }

  function getTotalPriseByPromocode(cartState: CartItem[], promocodeState: PromocodeData) {
    const totalPrice = getTotalPrice(cartState);
    const totalDiscount = getTotalDiscount(promocodeState);

    if (totalDiscount) {
      return totalPrice - (totalDiscount / 100) * totalPrice;
    } else return totalPrice;
  }

  function getTotalItems(cartItemsState: CartItem[]) {
    return cartItemsState.reduce((count, cartItem) => count + cartItem.quantity, 0);
  }

  return { totalItems, totalPrice, totalPriseByPromocode };
}
