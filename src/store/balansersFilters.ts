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
import { BalancerCategory, BalancerCollection, BalancerColor, Balancers } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Balancers = {
  balancerColor: COLOR_STOCK,
  balancerCollection: COLLECTION_STOCK,
  balancerCategory: CATEGORIES_STOCK,
  balanserPrise: [PRICE_MIN, PRICE_MAX],
  balanserSize: [SIZE_MIN, SIZE_MAX],
  balanserStock: [STOCK_MIN, STOCK_MAX],
};

const balansersFiltersSlise = createSlice({
  name: 'balansersFilters',
  initialState,
  reducers: {
    addBalancerColor: (state, action: PayloadAction<BalancerColor[]>) => {
      state = {
        ...state,
        balancerColor: action.payload,
      };
      return state;
    },

    addBalancerCollection: (state, action: PayloadAction<BalancerCollection[]>) => {
      state = {
        ...state,
        balancerCollection: action.payload,
      };
      return state;
    },

    addBalancerCategory: (state, action: PayloadAction<BalancerCategory[]>) => {
      state = {
        ...state,
        balancerCategory: action.payload,
      };
      return state;
    },

    addBalancerPrice: (state, action: PayloadAction<[number | null, number | null]>) => {
      state = {
        ...state,
        balanserPrise: action.payload,
      };
      return state;
    },

    addBalancerSize: (state, action: PayloadAction<[number | null, number | null]>) => {
      state = {
        ...state,
        balanserSize: action.payload,
      };
      return state;
    },

    addBalancerStock: (state, action: PayloadAction<[number | null, number | null]>) => {
      state = {
        ...state,
        balanserStock: action.payload,
      };
      return state;
    },

    resetBalansersFilters: () => {
      return initialState;
    },
  },
});

export const {
  addBalancerColor,
  addBalancerCollection,
  addBalancerCategory,
  addBalancerPrice,
  addBalancerSize,
  addBalancerStock,
  resetBalansersFilters,
} = balansersFiltersSlise.actions;
export default balansersFiltersSlise.reducer;
