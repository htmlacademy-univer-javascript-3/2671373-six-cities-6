import {createSelector} from '@reduxjs/toolkit';
import {State} from '@/shared/types';

const selectProfile = (state: State) => state.auth.profile;
const selectFavorites = (state: State) => state.favorites.favorites;

export const selectProfileWithFavorites = createSelector(
  [selectProfile, selectFavorites],
  (profile, favorites) => ({
    profile,
    favorites
  })
);
