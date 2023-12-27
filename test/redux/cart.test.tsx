import { beforeEach, describe, expect, it } from 'vitest';

import cartSlice, {
  addProductToCart,
  removeAllProductFromCart,
  removeProductFromCart,
  removeProductFromCartAll,
  setProductQuantityInCart,
} from '@/store/cart';
import { configureStore } from '@reduxjs/toolkit';

const PRODUCT_ONE = {
  id: '16',
  name: 'Gingerbread House',
  price: 4.99,
  stock: 8,
  collection: 2023,
  color: 'brown',
  size: 9,
  favorite: true,
  category: 'Tree decorations',
  images: [
    '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm.jpg',
    '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm (1).jpg',
  ],
};

const PRODUCT_TWO = {
  id: '17',
  name: 'LED lights warm',
  price: 8.99,
  stock: 20,
  collection: 2023,
  color: 'yellow',
  size: 700,
  favorite: false,
  category: 'Christmas lights',
  images: [
    '/assets/products/led-lights-warm-7-m.jpg',
    '/assets/products/led-lights-warm-7-m(1).jpg',
  ],
};

describe('Redux Cart Actions', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartSlice,
      },
    });
  });

  it('should add a product to the cart', async () => {
    const quantity = 1;
    store.dispatch(addProductToCart({ product: PRODUCT_ONE, quantity }));
    const updatedState = store.getState().cart;

    expect(updatedState.length).toBe(1);
    expect(updatedState[0].product).toHaveProperty('name', 'Gingerbread House');
  });

  it('should add a product no more than stock', async () => {
    const quantityOne = 1;
    const quantityTwo = 100;

    store.dispatch(addProductToCart({ product: PRODUCT_ONE, quantity: quantityOne }));
    const updatedState = store.getState().cart;

    expect(updatedState.length).toBe(1);
    expect(updatedState[0].product).toHaveProperty('name', 'Gingerbread House');

    store.dispatch(addProductToCart({ product: PRODUCT_ONE, quantity: quantityTwo }));
    const updatedStateTwo = store.getState().cart;

    expect(updatedStateTwo[0].quantity).toBe(PRODUCT_ONE.stock);
  });

  it('should add a quantity product to the cart', async () => {
    const quantity = 10;
    store.dispatch(setProductQuantityInCart({ product: PRODUCT_TWO, quantity }));
    const updatedState = store.getState().cart;

    expect(updatedState.length).toBe(1);
    expect(updatedState[0].quantity).toBe(10);
    expect(updatedState[0].product).toHaveProperty('name', 'LED lights warm');
  });

  it('should remove one item a product from the cart', () => {
    const quantity = 10;
    store.dispatch(setProductQuantityInCart({ product: PRODUCT_ONE, quantity }));
    const addedState = store.getState().cart;

    expect(addedState.length).toBe(1);
    expect(addedState[0].product).toHaveProperty('name', 'Gingerbread House');

    store.dispatch(removeProductFromCart(PRODUCT_ONE));
    const removeState = store.getState().cart;

    expect(removeState[0].quantity).toBe(quantity - 1);
    expect(removeState.length).toBe(1);
  });

  it('should remove all item product from the cart', () => {
    const quantity = 10;
    store.dispatch(setProductQuantityInCart({ product: PRODUCT_ONE, quantity }));

    const addedState = store.getState().cart;

    expect(addedState.length).toBe(1);
    expect(addedState[0].product).toHaveProperty('name', 'Gingerbread House');

    store.dispatch(removeProductFromCartAll(PRODUCT_ONE));
    const removeState = store.getState().cart;

    expect(removeState.length).toBe(0);
  });

  it('should remove all products from the cart', () => {
    const quantity = 10;
    store.dispatch(setProductQuantityInCart({ product: PRODUCT_ONE, quantity }));
    store.dispatch(setProductQuantityInCart({ product: PRODUCT_TWO, quantity }));

    const addedState = store.getState().cart;

    expect(addedState.length).toBe(2);
    expect(addedState[0].product).toHaveProperty('name', 'Gingerbread House');
    expect(addedState[1].product).toHaveProperty('name', 'LED lights warm');

    store.dispatch(removeAllProductFromCart());
    const removeState = store.getState().cart;

    expect(removeState.length).toBe(0);
  });
});
