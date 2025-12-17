import {createSlice} from '@reduxjs/toolkit';
import {TProfile} from '@/shared/model/auth';
import {getToken} from '@/shared/services';
import {login, checkAuth, logout} from './actions';

type TAuthState = {
  authorizationStatus: boolean;
  profile?: TProfile;
  isLoading: boolean;
}

const initialState = {
  authorizationStatus: !!getToken(),
  isLoading: false,
} as TAuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.authorizationStatus = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.authorizationStatus = false;
    });
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
      state.authorizationStatus = true;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.isLoading = false;
      state.profile = undefined;
      state.authorizationStatus = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.profile = undefined;
      state.authorizationStatus = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const authReducer = authSlice.reducer;
