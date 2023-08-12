import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logout, refreshUser, registerUser } from './operations';

const isRejectedAction = action =>
  action.type.endsWith('rejected') && action.type.includes('user');
const isPendingAction = action =>
  action.type.endsWith('pending') && action.type.includes('user');
const isFulfilledAction = action =>
  action.type.endsWith('fulfilled') && action.type.includes('user');

const initialState = {
  user: null,
  token: null,
  error: null,
  isAuthenticated: false,
  isLoading: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(logout, state => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addMatcher(isPendingAction, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addMatcher(isFulfilledAction, state => {
        state.isLoading = false;
      }),
});

export const authReducer = slice.reducer;