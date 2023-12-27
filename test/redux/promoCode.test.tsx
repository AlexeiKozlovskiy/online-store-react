import { beforeEach, describe, expect, it } from 'vitest';
import promocodeSlice, { addAppliedPromocode, removeAppliedPromocode } from '@/store/promocode';
import { configureStore } from '@reduxjs/toolkit';
import { isPromocodeAvailable } from '@/store/controller';

describe('Redux Promocode Actions', () => {
  let store: any;

  const PROMOCODE_NAME = 'NEW-YEAR-2024';
  const SOME_PROMOCODE = 'SOME-PROMOCODE';

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
    const PROMOCODE = {
      id: 1,
      name: 'NEW-YEAR-2024',
      discount: 7,
    };
    const { id, name } = PROMOCODE;

    expect(isPromocodeAvailable(name)).toBeTruthy();

    store.dispatch(addAppliedPromocode(id));
    const updatedState = store.getState();

    expect(updatedState.promocode.applied.length).toBe(1);
    expect(updatedState.promocode.applied[0]).toHaveProperty('name', 'NEW-YEAR-2024');
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
    const removeState = store.getState();

    expect(removeState.promocode.applied.length).toBe(0);
  });
});
