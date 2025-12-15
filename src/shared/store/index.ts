import {configureStore, } from '@reduxjs/toolkit';
import {offersReducer} from './offers.ts';
import {favoritesReducer} from './favorites.ts';
import {useDispatch} from 'react-redux';
import {authReducer} from './auth.ts';
import {commentsReducer} from './comments.ts';
import {nearbyReducer} from './nearby.ts';

export const rootStore = configureStore({
  reducer: {
    offers: offersReducer,
    auth: authReducer,
    favorites: favoritesReducer,
    comments: commentsReducer,
    nearby: nearbyReducer,
  }
});

export type AppDispatch = typeof rootStore.dispatch;
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof rootStore.getState>;

export * from './offers.ts';
export * from './auth.ts';
export * from './favorites.ts';
export * from './comments.ts';
export * from './nearby.ts';
