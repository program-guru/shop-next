import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Product, ProductState } from "../../../types/Product";
import productsData from "../../../data/products.json";

const initialState: ProductState = {
  items: [],
  status: "idle",
  error: null,
};

// SIMULATED API CALL
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return new Promise<Product[]>((resolve) => {
      setTimeout(() => {
        resolve(productsData as Product[]);
      }, 1000);
    });
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  // Handle the lifecycle of the AsyncThunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productSlice.reducer;
