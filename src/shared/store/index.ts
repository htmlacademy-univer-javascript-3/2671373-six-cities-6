import {configureStore, } from '@reduxjs/toolkit';
import {offersReducer} from './offers.ts';
import {useDispatch} from 'react-redux';

export const rootStore = configureStore({
  reducer: {
    offers: offersReducer
  }
});

export type AppDispatch = typeof rootStore.dispatch;
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof rootStore.getState>;

export * from './offers.ts';
