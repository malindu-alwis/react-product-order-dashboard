import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Order } from "../types/Order";
import * as ordersService from "../services/ordersService";

interface OrdersState {
  items: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
};


export const fetchOrders = createAsyncThunk("orders/fetch", async () => {
  return await ordersService.getOrders();
});


export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, status }: { id: number; status: string }) => {
    return await ordersService.updateOrder(id, { status });
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching orders";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex((o) => o.id === action.meta.arg.id);
        if (index !== -1) {
          state.items[index].status = action.meta.arg.status;
        }
      });
  },
});

export default ordersSlice.reducer;
