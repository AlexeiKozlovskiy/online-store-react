import products from '@/assets/data/products.json';
import { Product } from '@/components/types/types';
import store from '@/components/reducers/store';
import {
  addProductToCart,
  removeProductFromCart,
  setProductQuantityInCart,
  removeProductFromCartAll,
  removeAllProductFromCart,
} from '@/components/reducers/cart';
import { addAppliedPromocode, removeAppliedPromocode } from '@/components/reducers/promocode';

export function addProductsToCart(id: number, quantity: number = 1) {
  const product = products.find((product: Product) => product.id === id);
  if (product) {
    store.dispatch(addProductToCart({ product: product, quantity: quantity }));
  }
}
export function removeProductsFromCart(id: number) {
  const product = products.find((product: Product) => product.id === id);
  if (product) {
    store.dispatch(removeProductFromCart(product));
  }
}

export function setProductsQuantityInCart(id: number, value: number) {
  const product = products.find((product: Product) => product.id === id);
  if (product) {
    store.dispatch(setProductQuantityInCart({ product: product, quantity: value }));
  }
}

export function removeProductsFromCartAll(id: number) {
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
