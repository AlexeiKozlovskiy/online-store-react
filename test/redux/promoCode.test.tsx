import { beforeEach, describe, expect, it } from 'vitest';
import promocodeSlice, { addAppliedPromocode, removeAppliedPromocode } from '@/store/promocode';
import { configureStore } from '@reduxjs/toolkit';
import { isPromocodeAvailable } from '@/store/controller';

describe('Redux promocode reducers', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        promocode: promocodeSlice,
      },
    });
  });

  it('should promo code is available', async () => {
    const PROMOCODE_NAME = 'NEW-YEAR-2024';
    const SOME_PROMOCODE = 'SOME-PROMOCODE';

    expect(isPromocodeAvailable(PROMOCODE_NAME)).toBeTruthy();
    expect(isPromocodeAvailable(SOME_PROMOCODE)).toBeFalsy();
  });

  it('should apply promocode', async () => {
    const PROMOCODE_ONE = {
      id: 1,
      name: 'NEW-YEAR-2024',
      discount: 7,
    };
    const { id, name } = PROMOCODE_ONE;

    const PROMOCODE_TWO = {
      id: 2,
      name: 'JOLLY-XMAS',
      discount: 10,
    };

    expect(isPromocodeAvailable(name)).toBeTruthy();

    store.dispatch(addAppliedPromocode(id));
    const updatedState = store.getState().promocode;

    expect(updatedState.applied.length).toBe(1);
    expect(updatedState.applied[0]).toHaveProperty('name', 'NEW-YEAR-2024');

    store.dispatch(addAppliedPromocode(PROMOCODE_TWO.id));
    const updatedStatePromocodeTwo = store.getState().promocode;

    expect(updatedStatePromocodeTwo.applied.length).toBe(2);
    expect(updatedStatePromocodeTwo.applied[1]).toHaveProperty('name', 'JOLLY-XMAS');
  });

  it('should remove promocode', async () => {
    const PROMOCODE = {
      id: 1,
      name: 'NEW-YEAR-2024',
      discount: 7,
    };
    const { id } = PROMOCODE;

    store.dispatch(addAppliedPromocode(id));
    const appliedState = store.getState();

    expect(appliedState.promocode.applied.length).toBe(1);
    expect(appliedState.promocode.applied[0]).toHaveProperty('name', 'NEW-YEAR-2024');

    store.dispatch(removeAppliedPromocode(id));
    const removeState = store.getState().promocode;

    expect(removeState.applied.length).toBe(0);
  });
});
