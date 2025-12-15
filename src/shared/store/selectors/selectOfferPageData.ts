import {RootState} from '@/shared/store';
import {createSelector} from '@reduxjs/toolkit';

const selectCurrentOffer = (state: RootState) => state.currentOffer;
const selectComments = (state: RootState) => state.comments;
const selectNearby = (state: RootState) => state.nearby;

export const selectOfferPageData = createSelector(
  [selectComments, selectNearby, selectCurrentOffer],
  (comments, nearby, currentOffer) => ({
    currentOffer: currentOffer.currentOffer,
    isCurrentOfferLoading: currentOffer.isLoading,
    comments: comments.comments,
    isCommentsLoading: comments.isLoading,
    nearbyOffers: nearby.offers,
    isNearbyOffersLoading: nearby.isLoading
  })
);
