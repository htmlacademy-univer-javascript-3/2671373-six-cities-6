import {createSelector} from '@reduxjs/toolkit';
import {State} from '@/shared/types';

const selectCurrentOffer = (state: State) => state.currentOffer;
const selectComments = (state: State) => state.comments;
const selectNearby = (state: State) => state.nearby;

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
