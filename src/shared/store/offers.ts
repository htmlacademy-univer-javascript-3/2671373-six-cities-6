import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TOffer} from '@/shared/model/offer';
import {apiRoute, api} from '@/shared/store/api';

type TOffersState = {
  isLoading: boolean;
  error?: string;
  offers: TOffer[];
}

export const getOffersList = createAsyncThunk(
  'offers/getOffersListByLocation',
  async () => {
    const { data } = await api.get<TOffer[]>(apiRoute.offers);
    return data;
  }
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
        state.offers = action.payload;
      } else {
        state.error = 'error while getting offers';
      }
      state.isLoading = false;
    });
    builder.addCase(getOffersList.pending, (state) => {
      state.isLoading = true;
    });
  }
});

export const offersReducer = offersSlice.reducer;
