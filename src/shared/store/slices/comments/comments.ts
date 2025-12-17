import {TComment} from '@/shared/model/comment';
import {createSlice} from '@reduxjs/toolkit';
import { getComments } from './actions';

type TCommentsState = {
  comments: TComment[];
  isLoading: boolean;
}

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
      state.comments = action.payload || [];
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
