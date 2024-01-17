import {
  Product,
  Authentication,
  ChosenProduct,
  BalancerColor,
  BalancerCollection,
  BalancerCategory,
} from '@/types/types';
import store from '@/store/store';
import {
  addToCart,
  removeItemFromCart,
  removeAllItemsFromCart,
  setQuantityItemInCart,
  removeCart,
} from '@/store/cart';
import { addAppliedPromocode, removeAppliedPromocode } from '@/store/promocode';
import { clearAuthUser, setAuthUser } from './auth';
import { chosenProduct, resetChosenProduct } from './chosenProduct';
import { addQweryParams, resetQweryParams } from './productsQweryParams';
import {
  addBalancerCategory,
  addBalancerCollection,
  addBalancerColor,
  addBalancerPrice,
  addBalancerSize,
  addBalancerStock,
  resetBalansersFilters,
} from './balansersFilters';

export function addProductToCart(id: string, products: Product[], quantity: number = 1) {
  const product = products.find((product: Product) => product.id === id);
  if (product) {
    store.dispatch(addToCart({ product, quantity }));
  }
}

export function removeProductFromCart(id: string) {
  store.dispatch(removeItemFromCart(id));
}

export function setProductsQuantityInCart(id: string, quantity: number, products: Product[]) {
  const product = products.find((product: Product) => product.id === id);
  if (product) {
    store.dispatch(setQuantityItemInCart({ product, quantity }));
  }
}

export function removeAllProductsFromCart(id: string) {
  store.dispatch(removeAllItemsFromCart(id));
}

export function removeAllCart() {
  store.dispatch(removeCart());
}

export function isPromocodeAvailable(name: string): boolean {
  return store.getState().promocode.available.some((code) => code.name === name);
}

export function applyPromocode(name: string): void {
  const promo = store.getState().promocode.available.find((code) => code.name === name);
  if (promo) {
    store.dispatch(addAppliedPromocode(promo.id));
  }
}

export function removePromocode(id: number): void {
  const promo = store.getState().promocode.applied.find((code) => code.id === id);
  if (promo) {
    store.dispatch(removeAppliedPromocode(promo.id));
  }
}

export function setAuthParams(authParams: Authentication): void {
  store.dispatch(setAuthUser(authParams));
}

export function clearAuthParams() {
  store.dispatch(clearAuthUser());
}

export function setChosenProduct(product: ChosenProduct) {
  store.dispatch(chosenProduct(product));
}

export function clearChosenProduct() {
  store.dispatch(resetChosenProduct());
}

export function setQweryParams(qweryParams: string) {
  store.dispatch(addQweryParams(qweryParams));
}

export function clearQweryParams() {
  store.dispatch(resetQweryParams());
}

export function setBalansersColor(value: BalancerColor[]) {
  store.dispatch(addBalancerColor(value));
}

export function setBalansersCollection(value: BalancerCollection[]) {
  store.dispatch(addBalancerCollection(value));
}

export function setBalansersCategory(value: BalancerCategory[]) {
  store.dispatch(addBalancerCategory(value));
}

export function setBalansersPrice(value: [number | null, number | null]) {
  store.dispatch(addBalancerPrice(value));
}

export function setBalansersSize(value: [number | null, number | null]) {
  store.dispatch(addBalancerSize(value));
}
export function setBalansersStock(value: [number | null, number | null]) {
  store.dispatch(addBalancerStock(value));
}

export function clearBalansersFilters() {
  store.dispatch(resetBalansersFilters());
}
