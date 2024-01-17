import { beforeEach, describe, expect, it } from 'vitest';
import balansersFiltersSlise, {
  resetBalansersFilters,
  updateBalancerProperty,
} from '@/store/balansersFilters';
import { configureStore } from '@reduxjs/toolkit';
import { COLLECTION_STOCK, COLOR_STOCK } from '@/helpers/constant';

describe('Redux qwery params reducers', () => {
  let store: any;
  const colorsValues = [{ color: 'black' }, { color: 'blue' }, { color: 'brown' }];
  const collectionsValues = [{ collection: 2021 }, { collection: 2022 }];

  beforeEach(() => {
    store = configureStore({
      reducer: {
        balansersFilters: balansersFiltersSlise,
      },
    });
  });

  it('should update balancer property and remove', async () => {
    store.dispatch(updateBalancerProperty({ property: 'balancerColor', value: colorsValues }));
    const updatedState = store.getState().balansersFilters;

    expect(updatedState.balancerColor.length).toBe(3);

    store.dispatch(
      updateBalancerProperty({ property: 'balancerCollection', value: collectionsValues })
    );

    const updatedStateTwo = store.getState().balansersFilters;

    expect(updatedStateTwo.balancerColor.length).toBe(3);
    expect(updatedStateTwo.balancerCollection.length).toBe(2);

    store.dispatch(resetBalansersFilters());
    const updatedStateThree = store.getState().balansersFilters;

    expect(updatedStateThree.balancerColor.length).toBe(COLOR_STOCK.length);
    expect(updatedStateThree.balancerCollection.length).toBe(COLLECTION_STOCK.length);
  });
});
