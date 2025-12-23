import {deleteToken, saveToken} from '@/shared/services';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {LoginDTO, TProfile} from '@/shared/model/auth';
import {AppDispatch, State} from '@/shared/types';
import {AxiosError, AxiosInstance} from 'axios';
import {apiRoute} from '@/shared/constants';

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
