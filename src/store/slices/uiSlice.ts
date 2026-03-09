import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
}

interface UIState {
  toast: ToastState | null;
  isLoading: boolean;
}

const initialState: UIState = {
  toast: null,
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToast(
      state,
      action: PayloadAction<{message: string; type?: ToastType}>,
    ) {
      state.toast = {
        visible: true,
        message: action.payload.message,
        type: action.payload.type || 'info',
      };
    },
    hideToast(state) {
      state.toast = null;
    },
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const {showToast, hideToast, setGlobalLoading} = uiSlice.actions;
export default uiSlice.reducer;
