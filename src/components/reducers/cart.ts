import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartItemArg, Product } from '@/components/types/types';

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, { payload: cartItem }: PayloadAction<CartItemArg>): CartItem[] => {
      const item = state.find((item) => item.product.id === cartItem.product.id);
      if (!item) {
        return [
          ...state,
          {
            id: state.length + 1,
            product: cartItem.product,
            quantity: cartItem.quantity,
          },
        ];
      }
      item.quantity += cartItem.quantity;

      if (item.quantity > item.product.stock) {
        item.quantity = item.product.stock;
      }

      return state;
    },

    setProductQuantityInCart: (
      state,
      { payload: cartItem }: PayloadAction<CartItemArg>
    ): CartItem[] => {
      const item = state.find((item) => item.product.id === cartItem.product.id);
      if (!item) {
        return [
          ...state,
          {
            id: state.length + 1,
            product: cartItem.product,
            quantity: cartItem.quantity,
          },
        ];
      }
      item.quantity = cartItem.quantity;

      return state;
    },

    removeProductFromCart: (state, { payload: product }: PayloadAction<Product>): CartItem[] => {
      const item = state.find((item) => item.product.id === product.id);
      if (item) {
        if (item.quantity <= 1) {
          return state
            .filter((stateItem) => stateItem !== item)
            .map((p, i) => ({ ...p, id: i + 1 }));
        }
        item.quantity -= 1;
      }

      return state;
    },

    removeProductFromCartAll: (state, { payload: product }: PayloadAction<Product>): CartItem[] => {
      const item = state.find((item) => item.product.id === product.id);
      if (item) {
        return state.filter((stateItem) => stateItem !== item).map((p, i) => ({ ...p, id: i + 1 }));
      }
      return state;
    },
  },
});

export const {
  addProductToCart,
  setProductQuantityInCart,
  removeProductFromCart,
  removeProductFromCartAll,
} = cartSlice.actions;
export default cartSlice.reducer;
