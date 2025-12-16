import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TOffer} from '@/shared/model/offer';
import {AppDispatch, State} from '@/shared/types';
import {AxiosInstance} from 'axios';
import {apiRoute} from '@/shared/constants';

type TOffersState = {
  isLoading: boolean;
  offers: Record<string, TOffer[]>;
}

export const getOffersList = createAsyncThunk<Record<string, TOffer[]>, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/getOffersListByLocation',
  async (_, {extra: api}) => {
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
  }
});

export const offersReducer = offersSlice.reducer;
