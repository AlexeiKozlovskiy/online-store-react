import { Product } from '@/types/types';
import store from '@/reducers/store';
import {
  addProductToCart,
  removeProductFromCart,
  setProductQuantityInCart,
  removeProductFromCartAll,
  removeAllProductFromCart,
} from '@/reducers/cart';
import { addAppliedPromocode, removeAppliedPromocode } from '@/reducers/promocode';

export function addProductsToCart(id: string, products: Product[], quantity: number = 1) {
  const product = products.find((product: Product) => product.id === id);
  if (product) {
    store.dispatch(addProductToCart({ product: product, quantity: quantity }));
  }
}
export function removeProductsFromCart(id: string, products: Product[]) {
  const product = products.find((product: Product) => product.id === id);
  if (product) {
    store.dispatch(removeProductFromCart(product));
  }
}

export function setProductsQuantityInCart(id: string, value: number, products: Product[]) {
  const product = products.find((product: Product) => product.id === id);
  if (product) {
    store.dispatch(setProductQuantityInCart({ product: product, quantity: value }));
  }
}

export function removeProductsFromCartAll(id: string, products: Product[]) {
  const product = products.find((product: Product) => product.id === id);
  if (product) {
    store.dispatch(removeProductFromCartAll(product));
  }
}

export function removeAllProductsFromCart() {
  store.dispatch(removeAllProductFromCart());
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
