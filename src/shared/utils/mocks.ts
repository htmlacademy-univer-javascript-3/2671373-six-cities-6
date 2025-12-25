import { lorem, name, image, datatype, address, internet } from 'faker';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {State} from '@/shared/types';
import {createApi} from '@/shared/services';
import {TComment} from '@/shared/model/comment';
import {nanoid} from 'nanoid';
import {TUser} from '@/shared/model/user';
import {EOfferType, TCity, TLocation, TOffer, TOfferCard, TOfferRating} from '@/shared/model/offer';
import {TProfile} from '@/shared/model/auth';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>;

export const getRandomElementFromArray = <T> (array: T[]) => array[Math.floor(Math.random() * array.length)];

export const getRandomEnumValue = <T extends object>(anEnum: T): T[keyof T] => {
  const enumValues = Object.values(anEnum) as unknown as Array<T[keyof T]>;
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
};

export const extractActionsTypes = (actions: Action<string>[]) => actions.map((action) => action.type);

export const makeFakeRating = () => getRandomElementFromArray([1,2,3,4,5]) as TOfferRating;

export const makeFakeOfferType = () => getRandomEnumValue(EOfferType);

export const makeFakeLocation = (): TLocation => ({
  zoom: 1 + datatype.number(12),
  longitude: parseFloat(address.longitude()),
  latitude: parseFloat(address.latitude()),
});

export const makeFakeCity = (): TCity => ({
  name: address.cityName(),
  location: makeFakeLocation(),
});

export const makeFakeUser = (): TUser => ({
  name: name.firstName(),
  avatarUrl: image.avatar(),
  isPro: datatype.boolean(),
});

export const makeFakeComment = (): TComment => ({
  id: nanoid(),
  comment: lorem.text(),
  date: new Date().toISOString(),
  rating: makeFakeRating(),
  user: makeFakeUser(),
});

export const makeFakeOffer = (): TOffer => ({
  id: nanoid(),
  location: makeFakeLocation(),
  rating: makeFakeRating(),
  price: datatype.number(500) + 100,
  previewImage: image.image(),
  type: makeFakeOfferType(),
  isFavorite: datatype.boolean(),
  title: lorem.sentence(30),
  city: makeFakeCity(),
  isPremium: datatype.boolean(),
});

export const makeFakeOfferCard = (): TOfferCard => ({
  id: nanoid(),
  city: makeFakeCity(),
  type: makeFakeOfferType(),
  rating: makeFakeRating(),
  title: lorem.sentence(30),
  bedrooms: datatype.number(5),
  price: datatype.number(500) + 100,
  description: lorem.text(),
  goods: lorem.slug(5).split('-'),
  host: makeFakeUser(),
  images: [image.image(), image.image(), image.image(), image.image(), image.image(), image.image()],
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: makeFakeLocation(),
  maxAdults: datatype.number(5),
});

export const makeFakeProfile = (): TProfile => ({
  name: name.firstName(),
  avatarUrl: image.avatar(),
  isPro: datatype.boolean(),
  email: internet.email(),
  token: 'token'
});
