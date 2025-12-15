import {TComment} from '@/shared/model/comment';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api, apiRoute} from '@/shared/store/api';


type TCommentsState = {
  comments: TComment[];
  isLoading: boolean;
}

export const getComments = createAsyncThunk(
  'comments/getComments',
  async (id: string) => {
    const { data } = await api.get<TComment[]>(`${apiRoute.comments}/${id}`);
    return data;
  }
);

export const sendComment = createAsyncThunk(
  'comments/sendComment',
  async ({id, ...body}:{id: string; comment: string; rating: number}) => {
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
