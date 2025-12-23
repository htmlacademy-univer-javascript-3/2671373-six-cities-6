import {TOffer} from '@/shared/model/offer';
import {createSlice} from '@reduxjs/toolkit';
import { getNearOffers } from './actions';

type TNearbyState = {
  isLoading: boolean;
  offers: TOffer[];
}

const initialState = {
  isLoading: false,
  offers: [],
} as TNearbyState;

export const nearbySlice = createSlice({
  name: 'nearby',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNearOffers.fulfilled, (state, action) => {
      state.offers = action.payload || [];
      state.isLoading = false;
    });
    builder.addCase(getNearOffers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNearOffers.rejected, (state) => {
      state.offers = [];
      state.isLoading = false;
    });
  }
});

export const nearbyReducer = nearbySlice.reducer;
