import { beforeEach, describe, expect, it } from 'vitest';
import productsQweryParamsSlise, {
  addQweryParams,
  resetQweryParams,
} from '@/store/productsQweryParams';
import { configureStore } from '@reduxjs/toolkit';

describe('Redux qwery params reducers', () => {
  let store: any;
  const queryOne = '?colors=black';
  const queryTwo = '?colors=black?collections=2022';

  beforeEach(() => {
    store = configureStore({
      reducer: {
        productsQweryParams: productsQweryParamsSlise,
      },
    });
  });

  it('should add qwery params and his remove', async () => {
    store.dispatch(addQweryParams(queryOne));
    const updatedState = store.getState().productsQweryParams;

    expect(updatedState).toHaveProperty('qweryParams', queryOne);

    store.dispatch(addQweryParams(queryTwo));

    const updatedStateTwo = store.getState().productsQweryParams;

    expect(updatedStateTwo).toHaveProperty('qweryParams', queryTwo);

    store.dispatch(resetQweryParams());

    const updatedStateThree = store.getState().productsQweryParams;

    expect(updatedStateThree).toHaveProperty('qweryParams', '');
  });
});
