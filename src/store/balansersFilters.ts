import {
  CATEGORIES_STOCK,
  COLLECTION_STOCK,
  COLOR_STOCK,
  PRICE_MAX,
  PRICE_MIN,
  SIZE_MAX,
  SIZE_MIN,
  STOCK_MAX,
  STOCK_MIN,
} from '@/helpers/constant';
import { Balancers } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Balancers = {
  balancerColor: COLOR_STOCK,
  balancerCollection: COLLECTION_STOCK,
  balancerCategory: CATEGORIES_STOCK,
  balancerPrise: [PRICE_MIN, PRICE_MAX],
  balancerSize: [SIZE_MIN, SIZE_MAX],
  balancerStock: [STOCK_MIN, STOCK_MAX],
};

const balansersFiltersSlise = createSlice({
  name: 'balansersFilters',
  initialState,
  reducers: {
    updateBalancerProperty: <T extends keyof Balancers>(
      state: Balancers,
      action: PayloadAction<{ property: T; value: Balancers[T] }>
    ) => {
      state = {
        ...state,
        [action.payload.property]: action.payload.value,
      };
      return state;
    },

    resetBalansersFilters: () => {
      return initialState;
    },
  },
});

export const { updateBalancerProperty, resetBalansersFilters } = balansersFiltersSlise.actions;
export default balansersFiltersSlise.reducer;
