import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type Snackbar = { message: string; variant: 'success' | 'error' | null };
type UIState = { theme: 'light' | 'dark'; snackbar: Snackbar };

const initialState: UIState = { theme: 'light', snackbar: { message: '', variant: null } };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) { state.theme = state.theme === 'light' ? 'dark' : 'light'; },
    showSnackbar(state, action: PayloadAction<Snackbar>) { state.snackbar = action.payload; },
    clearSnackbar(state) { state.snackbar = { message: '', variant: null }; }
  }
});

export const { toggleTheme, showSnackbar, clearSnackbar } = uiSlice.actions;
export default uiSlice.reducer;
