import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isLoading: boolean;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  activeModal: string | null;
  refreshing: boolean;
}

const initialState: UIState = {
  isLoading: false,
  toast: null,
  activeModal: null,
  refreshing: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    showToast(state, action: PayloadAction<UIState['toast']>) {
      state.toast = action.payload;
    },
    hideToast(state) {
      state.toast = null;
    },
    openModal(state, action: PayloadAction<string>) {
      state.activeModal = action.payload;
    },
    closeModal(state) {
      state.activeModal = null;
    },
    setRefreshing(state, action: PayloadAction<boolean>) {
      state.refreshing = action.payload;
    },
  },
});

export const { setLoading, showToast, hideToast, openModal, closeModal, setRefreshing } =
  uiSlice.actions;
export default uiSlice.reducer;
