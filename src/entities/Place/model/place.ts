export type TPlaceType = 'Apartment' | 'Room'

export type TPlaceRating = 1 | 2 | 3 | 4 | 5

export type TPlace = {
  id: string;
  title: string;
  img: string;
  price: number;
  type: TPlaceType;
  rating: TPlaceRating;
}
