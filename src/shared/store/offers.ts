import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TComment, TOffer, TOfferCard} from '@/shared/model/offer';
import {apiRoute, api} from '@/shared/store/api';
import {AxiosError} from 'axios';

type TOffersState = {
  isLoading: boolean;
  offers: Record<string, TOffer[]>;
  favorites: Record<string, TOffer[]>;
  isFavoritesLoading: boolean;
  currentOffer?: TOfferCard;
  isCommentsLoading: boolean;
  isNearLoading: boolean;
  nearOffers: TOffer[];
  comments: TComment[];
}

export const getComments = createAsyncThunk(
  'offers/getComments',
  async (id: string) => {
    const { data } = await api.get<TComment[]>(`${apiRoute.comments}/${id}`);
    return data;
  }
);

export const sendComment = createAsyncThunk(
  'offers/sendComment',
  async ({id, ...body}:{id: string; comment: string; rating: number}) => {
    const { data } = await api.post<TComment>(`${apiRoute.comments}/${id}`, body);
    return data;
  }
);

export const changeOfferFavoriteStatus = createAsyncThunk(
  'offers/changeOfferFavoriteStatus',
  async ({id, favorite}:{id: string; favorite: boolean}) => {
    const {data} = await api.post<TOffer>(`${apiRoute.favorite}/${id}/${favorite ? 1 : 0}`);
    return data;
  }
);

export const getOfferById = createAsyncThunk(
  'offers/getOfferById',
  async (id: string, thunkAPI) => {
    try {
      const { data } = await api.get<TOfferCard>(`${apiRoute.offers}/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).response);
    }
  }
);

export const getNearOffers = createAsyncThunk(
  'offers/getNearOffers',
  async (id: string) => {
    const { data } = await api.get<TOffer[]>(`${apiRoute.offers}/${id}/nearby`);
    return data;
  }
);

export const getOffersList = createAsyncThunk(
  'offers/getOffersListByLocation',
  async () => {
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

export const getFavoriteOffersList = createAsyncThunk(
  'offers/getFavoriteOffersList',
  async () => {
    const { data } = await api.get<TOffer[]>(apiRoute.favorite);
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
  favorites: {},
  isFavoritesLoading: false,
  isNearLoading: false,
  isCommentsLoading: false,
  nearOffers: [],
  comments: []
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
    builder.addCase(getFavoriteOffersList.fulfilled, (state, action) => {
      state.favorites = action.payload;
      state.isFavoritesLoading = false;
    });
    builder.addCase(getFavoriteOffersList.pending, (state) => {
      state.isFavoritesLoading = true;
    });
    builder.addCase(getFavoriteOffersList.rejected, (state) => {
      state.isFavoritesLoading = false;
    });
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
    builder.addCase(getNearOffers.fulfilled, (state, action) => {
      state.nearOffers = action.payload;
      state.isNearLoading = false;
    });
    builder.addCase(getNearOffers.pending, (state) => {
      state.isNearLoading = true;
    });
    builder.addCase(getNearOffers.rejected, (state) => {
      state.nearOffers = [];
      state.isNearLoading = false;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isCommentsLoading = false;
    });
    builder.addCase(getComments.pending, (state) => {
      state.isCommentsLoading = true;
    });
    builder.addCase(getComments.rejected, (state) => {
      state.comments = [];
      state.isCommentsLoading = false;
    });
  }
});

export const offersReducer = offersSlice.reducer;
