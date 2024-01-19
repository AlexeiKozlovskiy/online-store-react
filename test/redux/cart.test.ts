import { beforeEach, describe, expect, it } from 'vitest';
import cartSlice, {
  addToCart,
  removeItemFromCart,
  removeAllItemsFromCart,
  setQuantityItemInCart,
  removeCart,
} from '@/store/cart';
import { configureStore } from '@reduxjs/toolkit';

describe('Redux cart reducers', () => {
  let store: any;
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

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartSlice,
      },
    });
  });

  it('should add a product to the cart', async () => {
    const quantityOne = 5;
    const quantityTwo = 2;
    store.dispatch(addToCart({ product: PRODUCT_ONE, quantity: quantityOne }));
    const updatedState = store.getState().cart;

    expect(updatedState.length).toBe(1);
    expect(updatedState[0].product).toHaveProperty('name', 'Gingerbread House');

    store.dispatch(addToCart({ product: PRODUCT_ONE, quantity: quantityTwo }));

    const updatedStateTwo = store.getState().cart;
    expect(updatedStateTwo[0].quantity).toBe(7);
  });

  it('should add a product no more than stock', async () => {
    const quantityOne = 1;
    const quantityTwo = 100;

    store.dispatch(addToCart({ product: PRODUCT_ONE, quantity: quantityOne }));
    const updatedState = store.getState().cart;

    expect(updatedState.length).toBe(1);
    expect(updatedState[0].product).toHaveProperty('name', 'Gingerbread House');

    store.dispatch(addToCart({ product: PRODUCT_ONE, quantity: quantityTwo }));
    const updatedStateTwo = store.getState().cart;

    expect(updatedStateTwo[0].quantity).toBe(PRODUCT_ONE.stock);
  });

  it('should add a quantity product to the cart', async () => {
    const quantityOne = 10;
    const quantityTwo = 12;

    store.dispatch(setQuantityItemInCart({ product: PRODUCT_TWO, quantity: quantityOne }));
    const updatedState = store.getState().cart;

    expect(updatedState.length).toBe(1);
    expect(updatedState[0].quantity).toBe(quantityOne);
    expect(updatedState[0].product).toHaveProperty('name', 'LED lights warm');

    store.dispatch(setQuantityItemInCart({ product: PRODUCT_TWO, quantity: quantityTwo }));
    const updatedStateTwo = store.getState().cart;

    expect(updatedStateTwo[0].quantity).toBe(quantityTwo);
  });

  it('should remove one item a product from the cart', () => {
    const quantity = 2;

    store.dispatch(setQuantityItemInCart({ product: PRODUCT_ONE, quantity }));
    const addedState = store.getState().cart;

    expect(addedState.length).toBe(1);
    expect(addedState[0].product).toHaveProperty('name', 'Gingerbread House');

    store.dispatch(removeItemFromCart(PRODUCT_ONE.id));
    const removeState = store.getState().cart;

    expect(removeState[0].quantity).toBe(quantity - 1);
    expect(removeState.length).toBe(1);

    store.dispatch(removeItemFromCart(PRODUCT_ONE.id));
    store.dispatch(removeItemFromCart(PRODUCT_ONE.id));

    const removeStateTwo = store.getState().cart;
    expect(removeStateTwo.length).toBe(0);
  });

  it('should remove all quantity item product from the cart', () => {
    const quantity = 10;

    store.dispatch(setQuantityItemInCart({ product: PRODUCT_ONE, quantity }));

    const addedState = store.getState().cart;

    expect(addedState.length).toBe(1);
    expect(addedState[0].product).toHaveProperty('name', 'Gingerbread House');

    store.dispatch(removeAllItemsFromCart(PRODUCT_ONE.id));
    const removeState = store.getState().cart;

    expect(removeState.length).toBe(0);

    store.dispatch(removeAllItemsFromCart(PRODUCT_ONE.id));
    const removeStateTwo = store.getState().cart;

    expect(removeStateTwo.length).toBe(0);
  });

  it('should changes itemNumber when remove one item product from the cart', () => {
    const quantity = 1;

    store.dispatch(setQuantityItemInCart({ product: PRODUCT_ONE, quantity }));
    store.dispatch(setQuantityItemInCart({ product: PRODUCT_TWO, quantity }));

    const addedState = store.getState().cart;

    expect(addedState.length).toBe(2);
    expect(addedState[0].product).toHaveProperty('name', 'Gingerbread House');
    expect(addedState[1].product).toHaveProperty('name', 'LED lights warm');

    store.dispatch(removeItemFromCart(PRODUCT_ONE.id));
    const removeState = store.getState().cart;

    expect(removeState.length).toBe(1);
    expect(removeState[0].itemNumber).toBe(1);
  });

  it('should changes itemNumber when remove all quantity item product from the cart', () => {
    const quantity = 10;

    store.dispatch(setQuantityItemInCart({ product: PRODUCT_ONE, quantity }));
    store.dispatch(setQuantityItemInCart({ product: PRODUCT_TWO, quantity }));

    const addedState = store.getState().cart;

    expect(addedState.length).toBe(2);
    expect(addedState[0].product).toHaveProperty('name', 'Gingerbread House');
    expect(addedState[1].product).toHaveProperty('name', 'LED lights warm');

    store.dispatch(removeAllItemsFromCart(PRODUCT_ONE.id));
    const removeState = store.getState().cart;

    expect(removeState.length).toBe(1);
    expect(removeState[0].itemNumber).toBe(1);
  });

  it('should remove all products all quantity from the cart', () => {
    const quantity = 10;

    store.dispatch(setQuantityItemInCart({ product: PRODUCT_ONE, quantity }));
    store.dispatch(setQuantityItemInCart({ product: PRODUCT_TWO, quantity }));

    const addedState = store.getState().cart;

    expect(addedState.length).toBe(2);
    expect(addedState[0].product).toHaveProperty('name', 'Gingerbread House');
    expect(addedState[1].product).toHaveProperty('name', 'LED lights warm');

    store.dispatch(removeCart());
    const removeState = store.getState().cart;

    expect(removeState.length).toBe(0);
  });
});
