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
