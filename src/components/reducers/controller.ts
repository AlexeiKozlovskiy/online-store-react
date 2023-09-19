import products from '@/assets/data/products.json';
import { Product } from '@/components/types/types';
import store from '@/components/reducers/store';
import {
  addProductToCart,
  removeProductFromCart,
  setProductQuantityInCart,
  removeProductFromCartAll,
} from '@/components/reducers/cart';

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
