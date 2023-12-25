import { ChooseProduct } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ChooseProduct = {
  id: '',
  name: '',
};

const chooseProductSlise = createSlice({
  name: 'chooseProduct',
  initialState,
  reducers: {
    chooseProduct: (state, action: PayloadAction<ChooseProduct>) => {
      const { id, name } = action.payload;
      state.id = id;
      state.name = name;
    },
    resetChooseProduct: (state) => {
      state.name = '';
      state.id = '';
    },
  },
});

export const { chooseProduct, resetChooseProduct } = chooseProductSlise.actions;
export default chooseProductSlise.reducer;
