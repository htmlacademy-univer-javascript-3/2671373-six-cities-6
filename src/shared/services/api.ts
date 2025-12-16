import axios, {AxiosError, AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {store} from '@/shared/store';
import {setAuthorizationStatus} from '@/shared/store/auth.ts';
import {deleteToken, getToken} from './token.ts';

const SERVER_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: SERVER_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['X-Token'] = token;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        store.dispatch(setAuthorizationStatus(false));
        deleteToken();
      }

      return Promise.reject(error);
    }
  );

  return api;
};
