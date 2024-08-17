
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem('user');
    },
    loadUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, loadUser } = authSlice.actions;

export default authSlice.reducer;
