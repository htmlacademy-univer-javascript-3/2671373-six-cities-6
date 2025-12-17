import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ChangeOfferFavoriteStatusDTO, TOffer} from '@/shared/model/offer';
import {AxiosError, AxiosInstance} from 'axios';
import {AppDispatch, State} from '@/shared/types';
import {apiRoute} from '@/shared/constants';

type TFavoritesState = {
  isLoading: boolean;
  favorites: Record<string, TOffer[]>;
}

export const getFavoriteOffersList = createAsyncThunk<Record<string, TOffer[]>, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/getFavoriteOffersList',
  async (_, {extra: api}) => {
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

export const changeOfferFavoriteStatus = createAsyncThunk<TOffer, ChangeOfferFavoriteStatusDTO, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/changeOfferFavoriteStatus',
  async ({id, favorite}, {rejectWithValue, extra: api}) => {
    try {
      const {data} = await api.post<TOffer>(`${apiRoute.favorite}/${id}/${favorite ? 1 : 0}`);
      return data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response);
    }
  }
);

const initialState = {
  favorites: {},
  isLoading: false
} as TFavoritesState;

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavoriteOffersList.fulfilled, (state, action) => {
      state.favorites = action.payload || {};
      state.isLoading = false;
    });
    builder.addCase(getFavoriteOffersList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFavoriteOffersList.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const favoritesReducer = favoritesSlice.reducer;
