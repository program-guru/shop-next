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
  async (_, { signal }) => { 
    return new Promise<Product[]>((resolve, reject) => {
      const timer = setTimeout(() => {
        resolve(productsData as Product[]);
      }, 500);

      // 2. Listen for abort event
      signal.addEventListener('abort', () => {
        clearTimeout(timer); 
        reject(new Error('Aborted')); 
      });
    });
  }
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