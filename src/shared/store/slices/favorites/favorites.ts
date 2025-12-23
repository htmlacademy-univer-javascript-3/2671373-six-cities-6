import {createSlice} from '@reduxjs/toolkit';
import {TOffer} from '@/shared/model/offer';
import {getFavoriteOffersList} from './actions.ts';

type TFavoritesState = {
  isLoading: boolean;
  favorites: Record<string, TOffer[]>;
}

const initialState = {
  favorites: {},
  isLoading: false
} as TFavoritesState;

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavoriteOffersList.fulfilled, (state, action) => {
      state.favorites = action.payload || {};
      state.isLoading = false;
    });
    builder.addCase(getFavoriteOffersList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFavoriteOffersList.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const favoritesReducer = favoritesSlice.reducer;
