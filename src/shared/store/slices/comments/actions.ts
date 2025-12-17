import {AppDispatch, State} from '@/shared/types';
import {AxiosInstance} from 'axios';
import {apiRoute} from '@/shared/constants';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {SendCommentDTO, TComment} from '@/shared/model/comment';

export const getComments = createAsyncThunk<TComment[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/getComments',
  async (id, {extra: api}) => {
    const { data } = await api.get<TComment[]>(`${apiRoute.comments}/${id}`);
    return data;
  }
);

export const sendComment = createAsyncThunk<TComment, SendCommentDTO, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/sendComment',
  async ({id, ...body}, {extra: api}) => {
    const { data } = await api.post<TComment>(`${apiRoute.comments}/${id}`, body);
    return data;
  }
);
