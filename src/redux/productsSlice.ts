import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";
import * as productsService from "../services/productsService";

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = { items: [], loading: false, error: null };

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  return await productsService.getProducts();
});

export const updateProductStock = createAsyncThunk(
  "products/updateStock",
  async ({ id, stock }: { id: number; stock: number }) => {
    return await productsService.updateProduct(id, { stock });
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.error.message || "Error"; })
      .addCase(updateProductStock.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
      });
  }
});

export default productsSlice.reducer;
