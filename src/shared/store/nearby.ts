import {TOffer} from '@/shared/model/offer';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AppDispatch, State} from '@/shared/types';
import {AxiosInstance} from 'axios';
import {apiRoute} from '@/shared/constants';

type TNearbyState = {
  isLoading: boolean;
  offers: TOffer[];
}

export const getNearOffers = createAsyncThunk<TOffer[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'nearby/getNearOffers',
  async (id, {extra: api}) => {
    const { data } = await api.get<TOffer[]>(`${apiRoute.offers}/${id}/nearby`);
    return data;
  }
);

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
      state.offers = action.payload;
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
