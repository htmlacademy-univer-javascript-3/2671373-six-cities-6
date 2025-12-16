import {combineReducers} from '@reduxjs/toolkit';
import {authReducer} from './auth.ts';
import {commentsReducer} from './comments.ts';
import {nearbyReducer} from './nearby.ts';
import {currentOfferReducer} from './currentOffer.ts';
import {offersReducer} from './offers.ts';
import {favoritesReducer} from './favorites.ts';

export const rootReducer = combineReducers({
  offers: offersReducer,
  auth: authReducer,
  favorites: favoritesReducer,
  comments: commentsReducer,
  nearby: nearbyReducer,
  currentOffer: currentOfferReducer,
});
