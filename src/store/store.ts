import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./features/filters/filterSlice";
import productReducer from "./features/products/productSlice";
import notificationReducer from "./features/notification/notificationSlice";

export const store = configureStore({
	reducer: {
		filters: filterReducer,
		products: productReducer,
		notification: notificationReducer
		// cart: cartReducer, // We will add this later
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
