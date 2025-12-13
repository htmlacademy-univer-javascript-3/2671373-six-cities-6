import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TOffer} from '@/shared/model/offer';
import {apiRoute, api} from '@/shared/store/api';

type TOffersState = {
  isLoading: boolean;
  error?: string;
  offers: TOffer[];
  favorites: Record<string, TOffer[]>;
}

export const getOffersList = createAsyncThunk(
  'offers/getOffersListByLocation',
  async () => {
    const { data } = await api.get<TOffer[]>(apiRoute.offers);
    return data;
  }
);

export const getFavoriteOffersList = createAsyncThunk(
  'offers/getFavoriteOffersList',
  async () => {
    const { data } = await api.get<TOffer[]>(apiRoute.favorite);
    return data.reduce((acc, curr) => {
      if (!acc[curr.city.name]) {
        acc[curr.city.name] = [];
      }
      acc[curr.city.name].push(curr);
      return acc;
    }, {} as Record<string, TOffer[]>);
  }
);

const initialState = {
  isLoading: false,
  offers: [],
  favorites: {},
} as TOffersState;

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOffersList.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getOffersList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOffersList.rejected, (state) => {
      state.error = 'error while getting offers';
      state.isLoading = false;
    });
    builder.addCase(getFavoriteOffersList.fulfilled, (state, action) => {
      state.favorites = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getFavoriteOffersList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFavoriteOffersList.rejected, (state) => {
      state.error = 'error while getting favorite offers';
      state.isLoading = false;
    });
  }
});

export const offersReducer = offersSlice.reducer;
