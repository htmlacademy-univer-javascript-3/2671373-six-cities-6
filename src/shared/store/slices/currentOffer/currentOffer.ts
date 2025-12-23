import {TOfferCard} from '@/shared/model/offer';
import {createSlice} from '@reduxjs/toolkit';
import { getOfferById } from './actions';

type TCurrentOfferState = {
  currentOffer?: TOfferCard;
  isLoading: boolean;
}

const initialState = {
  isLoading: false,
  currentOffer: undefined,
} as TCurrentOfferState;

export const currentOfferSlice = createSlice({
  name: 'currentOffer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOfferById.fulfilled, (state, action) => {
      state.currentOffer = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getOfferById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOfferById.rejected, (state) => {
      state.currentOffer = undefined;
      state.isLoading = false;
    });
  }
});

export const currentOfferReducer = currentOfferSlice.reducer;
