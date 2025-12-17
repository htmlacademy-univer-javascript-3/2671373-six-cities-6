import {createAsyncThunk} from '@reduxjs/toolkit';
import {TOffer} from '@/shared/model/offer';
import {AppDispatch, State} from '@/shared/types';
import {AxiosInstance} from 'axios';
import {apiRoute} from '@/shared/constants';

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
