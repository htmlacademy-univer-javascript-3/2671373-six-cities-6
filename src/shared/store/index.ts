import {configureStore, } from '@reduxjs/toolkit';
import {offersReducer} from './offers.ts';
import {useDispatch} from 'react-redux';
import {authReducer} from './auth.ts';

export const rootStore = configureStore({
  reducer: {
    offers: offersReducer,
    auth: authReducer,
  }
});

export type AppDispatch = typeof rootStore.dispatch;
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof rootStore.getState>;

export * from './offers.ts';
