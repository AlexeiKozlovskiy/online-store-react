import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartItemArg } from '@/types/types';
import { v4 as uuidv4 } from 'uuid';

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemArg>) => {
      const { product, quantity } = action.payload;

      const item = state.find((item) => item.product.id === product.id);
      const cartID = uuidv4();

      if (!item) {
        return [
          ...state,
          {
            cartID,
            itemNumber: state.length + 1,
            product,
            quantity,
          },
        ];
      }
      item.quantity += quantity;

      if (item.quantity > item.product.stock) {
        item.quantity = item.product.stock;
      }

      return state;
    },

    setQuantityItemInCart: (state, action: PayloadAction<CartItemArg>) => {
      const { product, quantity } = action.payload;

      const item = state.find((item) => item.product.id === product.id);
      const cartID = uuidv4();

      if (!item) {
        return [
          ...state,
          {
            cartID,
            itemNumber: state.length + 1,
            product,
            quantity,
          },
        ];
      }
      item.quantity = quantity;

      return state;
    },

    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      const item = state.find(({ product }) => product.id === id);
      if (item) {
        if (item.quantity <= 1) {
          return state
            .filter((stateItem) => stateItem !== item)
            .map((p, i) => ({ ...p, itemNumber: i + 1 }));
        }
        item.quantity -= 1;
      }

      return state;
    },

    removeAllItemsFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      const item = state.find(({ product }) => product.id === id);
      if (item) {
        return state
          .filter((stateItem) => stateItem !== item)
          .map((p, i) => ({ ...p, itemNumber: i + 1 }));
      }
      return state;
    },

    removeCart: (state) => {
      state = [];
      return state;
    },
  },
});

export const {
  addToCart,
  setQuantityItemInCart,
  removeItemFromCart,
  removeAllItemsFromCart,
  removeCart,
} = cartSlice.actions;
export default cartSlice.reducer;
