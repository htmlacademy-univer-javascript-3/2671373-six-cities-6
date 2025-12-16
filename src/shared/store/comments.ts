import {SendCommentDTO, TComment} from '@/shared/model/comment';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AppDispatch, State} from '@/shared/types';
import {AxiosInstance} from 'axios';
import {apiRoute} from '@/shared/constants';


type TCommentsState = {
  comments: TComment[];
  isLoading: boolean;
}

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

const initialState = {
  comments: [],
  isLoading: false,
} as TCommentsState;

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getComments.rejected, (state) => {
      state.comments = [];
      state.isLoading = false;
    });
  }
});

export const commentsReducer = commentsSlice.reducer;
