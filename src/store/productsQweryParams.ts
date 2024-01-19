import { ProductsQweryParams } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ProductsQweryParams = {
  qweryParams: '',
};

const productsQweryParamsSlise = createSlice({
  name: 'productsQweryParams',
  initialState,
  reducers: {
    addQweryParams: (state, action: PayloadAction<string>) => {
      const qweryParams = action.payload;
      state.qweryParams = qweryParams;
      return state;
    },
    resetQweryParams: (state) => {
      state.qweryParams = '';
    },
  },
});

export const { addQweryParams, resetQweryParams } = productsQweryParamsSlise.actions;
export default productsQweryParamsSlise.reducer;
