import {EOfferType, TOffer} from '@/shared/model/offer';
import {nanoid} from 'nanoid';

export const offersMock: TOffer[] = [
  {
    id: nanoid(),
    type: EOfferType.APARTMENT,
    title: 'Beautiful & luxurious apartment at great location',
    price: 120,
    img: 'img/apartment-01.jpg',
    rating: 3,
    premium: true
  },
  {
    id: nanoid(),
    type: EOfferType.ROOM,
    title: 'Wood and stone place',
    price: 80,
    img: 'img/room.jpg',
    rating: 4,
    premium: false
  },
  {
    id: nanoid(),
    type: EOfferType.APARTMENT,
    title: 'Canal View Prinsengracht',
    price: 132,
    img: 'img/apartment-02.jpg',
    rating: 5,
    premium: true
  },
  {
    id: nanoid(),
    type: EOfferType.APARTMENT,
    title: 'Beautiful & luxurious apartment at great location',
    price: 120,
    img: 'img/apartment-03.jpg',
    rating: 2,
    premium: false
  },
  {
    id: nanoid(),
    type: EOfferType.ROOM,
    title: 'Wood and stone place',
    price: 80,
    img: 'img/room.jpg',
    rating: 4,
    premium: true
  },
];

export const locations = [
  'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'
];

export const locationsCoords: Record<string, {title: string; lat: number; lng: number}> = {
  'Amsterdam': {
    title: 'Amsterdam',
    lat: 52.3909553943508,
    lng: 4.85309666406198,
  },
  'Brussels': {
    title: 'Brussels',
    lat: 50.847767,
    lng: 4.349394,
  },
  'Cologne': {
    title: 'Cologne',
    lat: 50.935994,
    lng: 6.960506
  },
  'Dusseldorf': {
    title: 'Dusseldorf',
    lat: 51.2277411,
    lng: 6.7734556
  },
  'Hamburg': {
    title: 'Hamburg',
    lat: 53.55833,
    lng: 10.025
  },
  'Paris': {
    title: 'Paris',
    lat: 48.8534,
    lng: 2.3488
  }
};

export const offersByLocationMock: Record<string, TOffer[]> = {
  'Paris': offersMock,
  'Cologne': offersMock,
  'Brussels': offersMock,
  'Amsterdam': offersMock,
  'Hamburg': offersMock,
  'Dusseldorf': offersMock
};
