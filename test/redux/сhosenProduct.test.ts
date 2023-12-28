import { beforeEach, describe, expect, it } from 'vitest';
import chosenProductSlise, { chosenProduct, resetChosenProduct } from '@/store/chosenProduct';
import { configureStore } from '@reduxjs/toolkit';

describe('Redux chosen product reducers', () => {
  let store: any;

  const CHOSEN_PRODUCT = {
    id: 'b1e9703b-420a-4a04-939f-8e46510d619d',
    name: 'Blowfish Glass',
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        chosenProduct: chosenProductSlise,
      },
    });
  });

  it('should add to chosen product', async () => {
    store.dispatch(chosenProduct(CHOSEN_PRODUCT));
    const updatedState = store.getState().chosenProduct;

    expect(updatedState).toHaveProperty('name', 'Blowfish Glass');
  });

  it('should remove from chosen product', async () => {
    store.dispatch(chosenProduct(CHOSEN_PRODUCT));
    const chosenState = store.getState();

    expect(chosenState.chosenProduct).toHaveProperty('name', 'Blowfish Glass');

    store.dispatch(resetChosenProduct());
    const removeState = store.getState().chosenProduct;

    expect(removeState.id).toBeNull();
    expect(removeState.name).toBeNull();
  });
});
