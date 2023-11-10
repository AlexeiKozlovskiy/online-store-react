import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PromocodeData } from '@/types/types';

const initialState: PromocodeData = {
  applied: [],
  available: [
    {
      id: 1,
      name: 'NEW-YEAR-2024',
      discount: 7,
    },
    {
      id: 2,
      name: 'JOLLY-XMAS',
      discount: 10,
    },
  ],
};

const promocodeSlice = createSlice({
  name: 'promocode',
  initialState,
  reducers: {
    addAppliedPromocode: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      const promocode = state.available.find((el) => el.id === id);
      if (promocode && !state.applied.some((el) => el.id === id)) {
        state.applied.push(promocode);
      }
      return state;
    },

    removeAppliedPromocode: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      state.applied = state.applied.filter((el) => el.id !== id);
      return state;
    },
  },
});

export const { addAppliedPromocode, removeAppliedPromocode } = promocodeSlice.actions;

export default promocodeSlice.reducer;
