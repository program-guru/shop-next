import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotalItems = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
);

export const selectCartTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0),
);

export const selectCartContents = selectCartItems;
