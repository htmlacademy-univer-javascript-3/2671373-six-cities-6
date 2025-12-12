// import {EOfferType, TOffer} from '@/shared/model/offer';
// import {nanoid} from 'nanoid';

// export const offersMock: TOffer[] = [
//   {
//     id: nanoid(),
//     type: EOfferType.APARTMENT,
//     title: 'Beautiful & luxurious apartment at great location',
//     price: 120,
//     previewImage: 'img/apartment-01.jpg',
//     rating: 3,
//     isPremium: true
//   },
//   {
//     id: nanoid(),
//     type: EOfferType.ROOM,
//     title: 'Wood and stone place',
//     price: 80,
//     previewImage: 'img/room.jpg',
//     rating: 4,
//     premium: false
//   },
//   {
//     id: nanoid(),
//     type: EOfferType.APARTMENT,
//     title: 'Canal View Prinsengracht',
//     price: 132,
//     previewImage: 'img/apartment-02.jpg',
//     rating: 5,
//     premium: true
//   },
//   {
//     id: nanoid(),
//     type: EOfferType.APARTMENT,
//     title: 'Beautiful & luxurious apartment at great location',
//     price: 120,
//     previewImage: 'img/apartment-03.jpg',
//     rating: 2,
//     premium: false
//   },
//   {
//     id: nanoid(),
//     type: EOfferType.ROOM,
//     title: 'Wood and stone place',
//     price: 80,
//     previewImage: 'img/room.jpg',
//     rating: 4,
//     premium: true
//   },
// ];

import {TCity} from '@/shared/model/offer';

export const cities = [
  'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'
];

export const citiesCoords: Record<string, TCity> = {
  'Amsterdam': {
    name: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 5
    }
  },
  'Brussels': {
    name: 'Brussels',
    location: {
      latitude: 50.847767,
      longitude: 4.349394,
      zoom: 5
    }
  },
  'Cologne': {
    name: 'Cologne',
    location: {
      latitude: 50.935994,
      longitude: 6.960506,
      zoom: 5
    }
  },
  'Dusseldorf': {
    name: 'Dusseldorf',
    location: {
      latitude: 51.2277411,
      longitude: 6.7734556,
      zoom: 5
    }
  },
  'Hamburg': {
    name: 'Hamburg',
    location: {
      latitude: 53.55833,
      longitude: 10.025,
      zoom: 5
    }
  },
  'Paris': {
    name: 'Paris',
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 5
    }
  }
};

// export const offersByCitiesMock: Record<string, TOffer[]> = {
//   'Paris': offersMock,
//   'Cologne': offersMock,
//   'Brussels': offersMock,
//   'Amsterdam': offersMock,
//   'Hamburg': offersMock,
//   'Dusseldorf': offersMock
// };
