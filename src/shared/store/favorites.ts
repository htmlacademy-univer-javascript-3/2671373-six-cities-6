import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api, apiRoute} from '@/shared/store/api';
import {TOffer} from '@/shared/model/offer';
import {AxiosError} from 'axios';

type TFavoritesState = {
  isLoading: boolean;
  favorites: Record<string, TOffer[]>;
}

export const getFavoriteOffersList = createAsyncThunk(
  'favorites/getFavoriteOffersList',
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

export const changeOfferFavoriteStatus = createAsyncThunk(
  'favorites/changeOfferFavoriteStatus',
  async ({id, favorite}:{id: string; favorite: boolean}, thunkAPI) => {
    try {
      const {data} = await api.post<TOffer>(`${apiRoute.favorite}/${id}/${favorite ? 1 : 0}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).response);
    }
  }
);

const initialState = {
  favorites: {},
  isLoading: false
} as TFavoritesState;

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavoriteOffersList.fulfilled, (state, action) => {
      state.favorites = action.payload;
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
