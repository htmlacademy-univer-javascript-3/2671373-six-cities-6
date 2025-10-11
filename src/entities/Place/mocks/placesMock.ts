import {EPlaceType, TPlace} from '../model/place.ts';
import {nanoid} from 'nanoid';

export const placesMock: TPlace[] = [
  {
    id: nanoid(),
    type: EPlaceType.APARTMENT,
    title: 'Beautiful & luxurious apartment at great location',
    price: 120,
    img: 'img/apartment-01.jpg',
    rating: 3
  },
  {
    id: nanoid(),
    type: EPlaceType.ROOM,
    title: 'Wood and stone place',
    price: 80,
    img: 'img/room.jpg',
    rating: 4
  },
  {
    id: nanoid(),
    type: EPlaceType.APARTMENT,
    title: 'Canal View Prinsengracht',
    price: 132,
    img: 'img/apartment-02.jpg',
    rating: 5
  },
  {
    id: nanoid(),
    type: EPlaceType.APARTMENT,
    title: 'Beautiful & luxurious apartment at great location',
    price: 120,
    img: 'img/apartment-03.jpg',
    rating: 2
  },
  {
    id: nanoid(),
    type: EPlaceType.ROOM,
    title: 'Wood and stone place',
    price: 80,
    img: 'img/room.jpg',
    rating: 4
  },
];
