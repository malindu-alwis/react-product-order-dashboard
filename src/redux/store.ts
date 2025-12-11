import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import ordersReducer from "./ordersSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: { products: productsReducer, 
             orders: ordersReducer,
             ui: uiReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
