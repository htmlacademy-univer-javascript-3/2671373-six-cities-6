import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import Cookies from 'js-cookie';
import {rootStore} from '@/shared/store';
import {setAuthorizationStatus} from '@/shared/store/auth.ts';

export const api = axios.create({
  baseURL: 'https://14.design.htmlacademy.pro/six-cities',
  timeout: 5000,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('token');

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
      rootStore.dispatch(setAuthorizationStatus(false));
      Cookies.remove('token');
    }

    return Promise.reject(error);
  }
);
