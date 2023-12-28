import { beforeEach, describe, expect, it } from 'vitest';
import promocodeSlice, { addAppliedPromocode, removeAppliedPromocode } from '@/store/promocode';
import { configureStore } from '@reduxjs/toolkit';
import { isPromocodeAvailable } from '@/store/controller';

describe('Redux promocode reducers', () => {
  let store: any;
  const PROMOCODE_NAME = 'NEW-YEAR-2024';
  const SOME_PROMOCODE = 'SOME-PROMOCODE';
  const PROMOCODE_ONE = {
    id: 1,
    name: 'NEW-YEAR-2024',
    discount: 7,
  };
  const PROMOCODE_TWO = {
    id: 2,
    name: 'JOLLY-XMAS',
    discount: 10,
  };
  const SOME_ID = 12;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        promocode: promocodeSlice,
      },
    });
  });

  it('should promo code is available', async () => {
    expect(isPromocodeAvailable(PROMOCODE_NAME)).toBeTruthy();
    expect(isPromocodeAvailable(SOME_PROMOCODE)).toBeFalsy();
  });

  it('should apply promocode', async () => {
    expect(isPromocodeAvailable(PROMOCODE_ONE.name)).toBeTruthy();

    store.dispatch(addAppliedPromocode(PROMOCODE_ONE.id));
    const updatedState = store.getState().promocode;

    expect(updatedState.applied.length).toBe(1);
    expect(updatedState.applied[0]).toHaveProperty('name', 'NEW-YEAR-2024');

    store.dispatch(addAppliedPromocode(PROMOCODE_TWO.id));
    const updatedStatePromocodeTwo = store.getState().promocode;

    expect(updatedStatePromocodeTwo.applied.length).toBe(2);
    expect(updatedStatePromocodeTwo.applied[1]).toHaveProperty('name', 'JOLLY-XMAS');

    store.dispatch(addAppliedPromocode(SOME_ID));
    const updatedStateTwo = store.getState().promocode;

    expect(updatedStateTwo.applied.length).toBe(2);
    expect(updatedStateTwo.applied[0]).toHaveProperty('name', 'NEW-YEAR-2024');
    expect(updatedStateTwo.applied[1]).toHaveProperty('name', 'JOLLY-XMAS');
  });

  it('should remove promocode', async () => {
    const { id } = PROMOCODE_ONE;

    store.dispatch(addAppliedPromocode(id));
    const appliedState = store.getState();

    expect(appliedState.promocode.applied.length).toBe(1);
    expect(appliedState.promocode.applied[0]).toHaveProperty('name', 'NEW-YEAR-2024');

    store.dispatch(removeAppliedPromocode(id));
    const removeState = store.getState().promocode;

    expect(removeState.applied.length).toBe(0);
  });
});
