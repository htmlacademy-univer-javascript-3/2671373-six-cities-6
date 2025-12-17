import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {LoginDTO, TProfile} from '@/shared/model/auth';
import {AxiosError, AxiosInstance} from 'axios';
import {apiRoute} from '@/shared/constants';
import {AppDispatch, State} from '@/shared/types';
import {deleteToken, getToken, saveToken} from '@/shared/services';

type TAuthState = {
  authorizationStatus: boolean;
  profile?: TProfile;
  isLoading: boolean;
}

export const login = createAsyncThunk<TProfile, LoginDTO, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/login',
  async (data, { rejectWithValue, extra: api }) => {
    try {
      const response = await api.post<TProfile>(apiRoute.login, data);
      saveToken(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response);
    }
  }
);

export const logout = createAsyncThunk<TProfile, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/logout',
  async (_, {extra: api}) => {
    const response = await api.get<TProfile>(apiRoute.logout);
    deleteToken();
    return response.data;
  }
);

export const checkAuth = createAsyncThunk<TProfile, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/checkAuth',
  async (_, {extra: api}) => {
    const response = await api.get<TProfile>(apiRoute.login);
    return response.data;
  }
);

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
