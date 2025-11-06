import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {offersByLocationMock, offersMock} from '@/shared/mocks';
import {TOffer} from '@/shared/model/offer';

type TOffersState = {
  isLoading: boolean;
  error?: string;
  offers: TOffer[];
}

export const getOffersList = createAsyncThunk(
  'offers/getOffersList',
  () => ({
    data: offersMock
  })
);

export const getOffersListByLocation = createAsyncThunk(
  'offers/getOffersListByLocation',
  (location: string) => ({
    data: offersByLocationMock[location],
  })
);

const initialState = {
  isLoading: false,
  offers: []
} as TOffersState;

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOffersList.fulfilled, (state, action) => {
      if (action.payload) {
        state.offers = action.payload.data;
      } else {
        state.error = 'error while getting offers';
      }
      state.isLoading = false;
    });
    builder.addCase(getOffersList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOffersListByLocation.fulfilled, (state, action) => {
      if (action.payload) {
        state.offers = action.payload.data;
      } else {
        state.error = 'error while getting offers';
      }
      state.isLoading = false;
    });
    builder.addCase(getOffersListByLocation.pending, (state) => {
      state.isLoading = true;
    });
  }
});

export const offersReducer = offersSlice.reducer;
