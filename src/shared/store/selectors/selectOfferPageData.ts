import {RootState} from '@/shared/store';
import {createSelector} from '@reduxjs/toolkit';

const selectOffers = (state: RootState) => state.offers;
const selectComments = (state: RootState) => state.comments;
const selectNearby = (state: RootState) => state.nearby;

export const selectOfferPageData = createSelector(
  [selectOffers, selectComments, selectNearby],
  (offers, comments, nearby) => ({
    currentOffer: offers.currentOffer,
    isCurrentOfferLoading: offers.isLoading,
    comments: comments.comments,
    isCommentsLoading: comments.isLoading,
    nearbyOffers: nearby.offers,
    isNearbyOffersLoading: nearby.isLoading
  })
);
