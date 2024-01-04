import { ChosenProduct } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ChosenProduct = {
  id: null,
  name: null,
};

const chosenProductSlise = createSlice({
  name: 'chooseProduct',
  initialState,
  reducers: {
    chosenProduct: (state, action: PayloadAction<ChosenProduct>) => {
      const { id, name } = action.payload;
      state.id = id;
      state.name = name;
    },
    resetChosenProduct: (state) => {
      state.name = null;
      state.id = null;
    },
  },
});

export const { chosenProduct, resetChosenProduct } = chosenProductSlise.actions;
export default chosenProductSlise.reducer;
