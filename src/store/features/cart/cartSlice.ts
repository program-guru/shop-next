import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartState } from "../../../types/Cart";
import type { Product } from "../../../types/Product";

// Helper function to save cart state to local storage
function saveStateToLocalStorage(state: CartState) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    console.warn("Could not save cart to local storage", e);
  }
};

// Helper function to load cart state from local storage
function loadStateFromLocalStorage(): CartState {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return { items: [] };
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load cart from local storage", e);
    return { items: [] };
  }
};

const initialState: CartState = loadStateFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; size: string }>,
    ) => {
      const { product, size } = action.payload;
      const cartItemId = `${product.id}-${size}`;

      // Check if item already exists
      const existingItem = state.items.find(
        (item) => item.cartItemId === cartItemId,
      );

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

      saveStateToLocalStorage(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.cartItemId !== action.payload,
      );

      saveStateToLocalStorage(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find(
        (item) => item.cartItemId === action.payload.id,
      );
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }

      saveStateToLocalStorage(state);
    },

    clearCart: (state) => {
      state.items = [];

      saveStateToLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
