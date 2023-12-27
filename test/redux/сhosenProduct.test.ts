import { beforeEach, describe, expect, it } from 'vitest';
import chooseProductSlise, { chosenProduct, resetChosenProduct } from '@/store/chosenProduct';
import { configureStore } from '@reduxjs/toolkit';

describe('Redux Chosen Product Actions', () => {
  let store: any;

  const PRODUCT = {
    id: 'b1e9703b-420a-4a04-939f-8e46510d619d',
    name: 'Blowfish Glass',
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        chooseProduct: chooseProductSlise,
      },
    });
  });

  it('should add to chosen product', async () => {
    store.dispatch(chosenProduct(PRODUCT));
    const updatedState = store.getState();

    expect(updatedState.chooseProduct).toHaveProperty('name', 'Blowfish Glass');
  });

  it('should remove from chosen product', async () => {
    store.dispatch(chosenProduct(PRODUCT));
    const chosenState = store.getState();

    expect(chosenState.chooseProduct).toHaveProperty('name', 'Blowfish Glass');

    store.dispatch(resetChosenProduct());
    const removeState = store.getState();

    expect(removeState.chooseProduct.id).toBeNull();
    expect(removeState.chooseProduct.name).toBeNull();
  });
});
