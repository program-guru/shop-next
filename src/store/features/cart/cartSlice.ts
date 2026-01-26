import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartState } from "../../../types/Cart";
import type { Product } from "../../../types/Product";

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; size: string }>) => {
      const { product, size } = action.payload;
      const cartItemId = `${product.id}-${size}`;

      // Check if item already exists
      const existingItem = state.items.find((item) => item.cartItemId === cartItemId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          cartItemId,
          product: product, 
          selectedSize: size,
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.cartItemId !== action.payload);
    },

    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((item) => item.cartItemId === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;