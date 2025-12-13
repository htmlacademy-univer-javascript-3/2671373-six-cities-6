import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api, apiRoute} from '@/shared/store/api';
import {TProfile} from '@/shared/model/auth';
import {AxiosError} from 'axios';
import Cookies from 'js-cookie';

type TAuthState = {
  authorizationStatus: boolean;
  profile?: TProfile;
  isLoading: boolean;
  error?: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async (data: {email: string; password: string}, thunkAPI) => {
    try {
      const response = await api.post<TProfile>(apiRoute.login, data);
      Cookies.set('token', response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).response);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    const response = await api.get<TProfile>(apiRoute.logout);
    Cookies.remove('token');
    return response.data;
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const response = await api.get<TProfile>(apiRoute.login);
    return response.data;
  }
);

const initialState = {
  authorizationStatus: !!Cookies.get('token'),
  isLoading: false,
} as TAuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<boolean>) => {
      state.authorizationStatus = action.payload;
    }
  },
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
      state.error = 'error while login';
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
  }
});

export const { setAuthorizationStatus } = authSlice.actions;

export const authReducer = authSlice.reducer;
