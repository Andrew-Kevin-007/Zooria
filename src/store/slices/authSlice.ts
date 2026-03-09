import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../types/user';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const {setUser, logout, setLoading} = authSlice.actions;
export default authSlice.reducer;
