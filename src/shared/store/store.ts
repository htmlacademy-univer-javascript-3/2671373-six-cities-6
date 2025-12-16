import {configureStore, } from '@reduxjs/toolkit';
import {rootReducer} from './rootReducer.ts';
import {createApi} from '@/shared/services';

const api = createApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }),
});
