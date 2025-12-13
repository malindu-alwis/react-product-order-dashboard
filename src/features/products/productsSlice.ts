import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/Product";
import * as productsService from "../../services/productsService";

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (filters?: { name?: string; category?: string; minPrice?: number; maxPrice?: number }) => {
    return await productsService.getProducts(filters);
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id: number) => {
    return await productsService.getProductById(id);
  }
);

export const updateProductStockOrStatus = createAsyncThunk(
  "products/update",
  async ({ id, data }: { id: number; data: Partial<Product> }) => {
    return await productsService.updateProduct(id, data);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {  
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error fetching products";
    });

    builder.addCase(updateProductStockOrStatus.fulfilled, (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    });
  },
});

export default productSlice.reducer;
