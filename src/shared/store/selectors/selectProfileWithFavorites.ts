import {RootState} from '@/shared/store';
import {createSelector} from '@reduxjs/toolkit';

const selectProfile = (state: RootState) => state.auth.profile;
const selectFavorites = (state: RootState) => state.favorites.favorites;

export const selectProfileWithFavorites = createSelector(
  [selectProfile, selectFavorites],
  (profile, favorites) => ({
    profile,
    favorites
  })
);
