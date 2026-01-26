import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./features/filters/filterSlice";
import productReducer from "./features/products/productSlice";
import notificationReducer from "./features/notification/notificationSlice";
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    products: productReducer,
    notification: notificationReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
