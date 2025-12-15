import {TOffer} from '@/shared/model/offer';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api, apiRoute} from '@/shared/store/api';

type TNearbyState = {
  isLoading: boolean;
  offers: TOffer[];
}

export const getNearOffers = createAsyncThunk(
  'nearby/getNearOffers',
  async (id: string) => {
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
