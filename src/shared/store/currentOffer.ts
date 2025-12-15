import {TOfferCard} from '@/shared/model/offer';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api, apiRoute} from '@/shared/store/api';
import {AxiosError} from 'axios';

type TCurrentOfferState = {
  currentOffer?: TOfferCard;
  isLoading: boolean;
}

export const getOfferById = createAsyncThunk(
  'currentOffer/getOfferById',
  async (id: string, thunkAPI) => {
    try {
      const { data } = await api.get<TOfferCard>(`${apiRoute.offers}/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).response);
    }
  }
);

const initialState = {
  isLoading: false,
  currentOffer: undefined,
} as TCurrentOfferState;

export const currentOfferSlice = createSlice({
  name: 'currentOffer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  }
});

export const currentOfferReducer = currentOfferSlice.reducer;
