import {createAsyncThunk} from '@reduxjs/toolkit';
import {TOfferCard} from '@/shared/model/offer';
import {AppDispatch, State} from '@/shared/types';
import {AxiosError, AxiosInstance} from 'axios';
import {apiRoute} from '@/shared/constants';

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
