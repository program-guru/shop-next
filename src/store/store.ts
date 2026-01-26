import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./features/filters/filterSlice";
import productReducer from "./features/products/productSlice";

export const store = configureStore({
	reducer: {
		filters: filterReducer,
		products: productReducer,
		// cart: cartReducer, // We will add this later
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
