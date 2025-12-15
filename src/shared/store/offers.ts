import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TOffer, TOfferCard} from '@/shared/model/offer';
import {apiRoute, api} from '@/shared/store/api';
import {AxiosError} from 'axios';

type TOffersState = {
  isLoading: boolean;
  offers: Record<string, TOffer[]>;
  currentOffer?: TOfferCard;
  isNearLoading: boolean;
  nearOffers: TOffer[];
}

export const getOfferById = createAsyncThunk(
  'offers/getOfferById',
  async (id: string, thunkAPI) => {
    try {
      const { data } = await api.get<TOfferCard>(`${apiRoute.offers}/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).response);
    }
  }
);

export const getNearOffers = createAsyncThunk(
  'offers/getNearOffers',
  async (id: string) => {
    const { data } = await api.get<TOffer[]>(`${apiRoute.offers}/${id}/nearby`);
    return data;
  }
);

export const getOffersList = createAsyncThunk(
  'offers/getOffersListByLocation',
  async () => {
    const { data } = await api.get<TOffer[]>(apiRoute.offers);
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
  offers: {},
  isNearLoading: false,
  nearOffers: [],
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
      state.isLoading = false;
    });
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
    builder.addCase(getNearOffers.fulfilled, (state, action) => {
      state.nearOffers = action.payload;
      state.isNearLoading = false;
    });
    builder.addCase(getNearOffers.pending, (state) => {
      state.isNearLoading = true;
    });
    builder.addCase(getNearOffers.rejected, (state) => {
      state.nearOffers = [];
      state.isNearLoading = false;
    });
  }
});

export const offersReducer = offersSlice.reducer;
