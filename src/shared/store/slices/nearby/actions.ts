import {createAsyncThunk} from '@reduxjs/toolkit';
import {TOffer} from '@/shared/model/offer';
import {AppDispatch, State} from '@/shared/types';
import {AxiosInstance} from 'axios';
import {apiRoute} from '@/shared/constants';

export const getNearOffers = createAsyncThunk<TOffer[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'nearby/getNearOffers',
  async (id, {extra: api}) => {
    const { data } = await api.get<TOffer[]>(`${apiRoute.offers}/${id}/nearby`);
    return data;
  }
);
