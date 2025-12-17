import {combineReducers} from '@reduxjs/toolkit';
import {
  authReducer,
  commentsReducer,
  nearbyReducer,
  currentOfferReducer,
  offersReducer,
  favoritesReducer
} from './slices';

export const rootReducer = combineReducers({
  offers: offersReducer,
  auth: authReducer,
  favorites: favoritesReducer,
  comments: commentsReducer,
  nearby: nearbyReducer,
  currentOffer: currentOfferReducer,
});
