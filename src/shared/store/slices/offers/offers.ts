import {createSlice} from '@reduxjs/toolkit';
import {TOffer} from '@/shared/model/offer';
import {getOffersList} from './actions';

type TOffersState = {
  isLoading: boolean;
  offers: Record<string, TOffer[]>;
}

const initialState = {
  isLoading: false,
  offers: {},
} as TOffersState;

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOffersList.fulfilled, (state, action) => {
      state.offers = action.payload || {};
      state.isLoading = false;
    });
    builder.addCase(getOffersList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOffersList.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const offersReducer = offersSlice.reducer;
