import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TOffer, TOfferCard} from '@/shared/model/offer';
import {apiRoute, api} from '@/shared/store/api';

type TOffersState = {
  isLoading: boolean;
  error?: string;
  offers: Record<string, TOffer[]>;
  favorites: Record<string, TOffer[]>;
  currentOffer?: TOfferCard;
  isNearLoading: boolean;
  nearError?: string;
  nearOffers: TOffer[];
}

export const getOfferById = createAsyncThunk(
  'offers/getOfferById',
  async (id: string) => {
    const { data } = await api.get<TOfferCard>(`${apiRoute.offers}/${id}`);
    return data;
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
  offers: {},
  favorites: {},
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
      state.error = undefined;
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
      state.error = undefined;
    });
    builder.addCase(getFavoriteOffersList.rejected, (state) => {
      state.error = 'error while getting favorite offers';
      state.isLoading = false;
    });
    builder.addCase(getOfferById.fulfilled, (state, action) => {
      state.currentOffer = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getOfferById.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(getOfferById.rejected, (state) => {
      state.error = 'error while getting offer';
      state.isLoading = false;
    });
    builder.addCase(getNearOffers.fulfilled, (state, action) => {
      state.nearOffers = action.payload;
      state.isNearLoading = false;
    });
    builder.addCase(getNearOffers.pending, (state) => {
      state.isNearLoading = true;
      state.nearError = undefined;
    });
    builder.addCase(getNearOffers.rejected, (state) => {
      state.nearError = 'error while getting nearby offers';
      state.isNearLoading = false;
    });
  }
});

export const offersReducer = offersSlice.reducer;
