import {TOfferCard} from '@/shared/model/offer';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError, AxiosInstance} from 'axios';
import {apiRoute} from '@/shared/constants';
import {AppDispatch, State} from '@/shared/types';

type TCurrentOfferState = {
  currentOffer?: TOfferCard;
  isLoading: boolean;
}

export const getOfferById = createAsyncThunk<TOfferCard, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'currentOffer/getOfferById',
  async (id: string, {rejectWithValue, extra: api}) => {
    try {
      const { data } = await api.get<TOfferCard>(`${apiRoute.offers}/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response);
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
